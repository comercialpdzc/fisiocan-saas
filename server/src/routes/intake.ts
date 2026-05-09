import { Router } from 'express';
import { prisma } from '../db';

const router = Router();

type AnimalData = Record<string, string>;

async function createPatientWithIntake(a: AnimalData, tutorId: number) {
  return prisma.patient.create({
    data: {
      name: a.nombreAnimal || 'Sin nombre',
      species: a.especieRaza?.split('/')[0]?.trim() || a.tipo || 'Perro',
      breed: a.especieRaza?.split('/')[1]?.trim() || '',
      birthDate: a.edadNacimiento || '',
      weight: a.peso || '',
      sex: a.sexo || '',
      neutered: a.esterilizado || '',
      photoUrl: a.photoUrl || null,
      diseases: a.enfermedades || a.diseases || null,
      allergies: a.alergias || a.allergies || null,
      tutorId,
      intakeData: {
        create: {
          enfermedades:        a.enfermedades || '',
          alergias:            a.alergias || '',
          motivoConsulta:      a.motivoConsulta || '',
          desdeCuando:         a.desdeCuando || '',
          inicioSintomas:      a.inicioSintomas || '',
          momentosPeorMejor:   a.momentosPeorMejor || '',
          sintomasObservados:  a.sintomasObservados || '',
          dolorAlComer:        a.dolorAlComer || '',
          lesionesPrevias:     a.lesionesPrevias || '',
          cirugiaPrevia:       a.cirugiaPrevia || '',
          cirugiaDetalle:      a.cirugiaDetalle || '',
          diagnosticoPrevio:   a.diagnosticoPrevio || '',
          medicacion:          a.medicacion || '',
          medicacionDetalle:   a.medicacionDetalle || '',
          fisioterapiaPrevia:  a.fisioterapiaPrevia || '',
          fisioterapiaDetalle: a.fisioterapiaDetalle || '',
          mejoriaCon:          a.mejoriaCon || '',
          veterinarioRef:      a.veterinarioRef || '',
          nivelActividad:      a.nivelActividad || '',
          tipoPaseos:          a.tipoPaseos || '',
          dondeDuerme:         a.dondeDuerme || '',
          escaleras:           a.escaleras || '',
          observaciones:       a.observaciones || '',
          objetivos:           a.objetivos || '',
        },
      },
    },
    include: { tutor: true, intakeData: true },
  });
}

// Public endpoint — called from the intake form (no auth required)
router.post('/', async (req, res) => {
  try {
    const d = req.body;

    // Update-mode: overwrite existing patient's data (used for the ?update= link)
    if (d.updatePatientId) {
      const patientId = Number(d.updatePatientId);
      const existing = await prisma.patient.findUnique({ where: { id: patientId } });
      if (!existing) { res.status(404).json({ success: false, error: 'Paciente no encontrado' }); return; }

      // Pick data from first animal (or flat fields)
      const a: AnimalData = (Array.isArray(d.animals) && d.animals.length > 0) ? d.animals[0] : d as AnimalData;
      const intakeFields = {
        enfermedades:        a.enfermedades || '',
        alergias:            a.alergias || '',
        motivoConsulta:      a.motivoConsulta || '',
        desdeCuando:         a.desdeCuando || '',
        inicioSintomas:      a.inicioSintomas || '',
        momentosPeorMejor:   a.momentosPeorMejor || '',
        sintomasObservados:  a.sintomasObservados || '',
        dolorAlComer:        a.dolorAlComer || '',
        lesionesPrevias:     a.lesionesPrevias || '',
        cirugiaPrevia:       a.cirugiaPrevia || '',
        cirugiaDetalle:      a.cirugiaDetalle || '',
        diagnosticoPrevio:   a.diagnosticoPrevio || '',
        medicacion:          a.medicacion || '',
        medicacionDetalle:   a.medicacionDetalle || '',
        fisioterapiaPrevia:  a.fisioterapiaPrevia || '',
        fisioterapiaDetalle: a.fisioterapiaDetalle || '',
        mejoriaCon:          a.mejoriaCon || '',
        veterinarioRef:      a.veterinarioRef || '',
        nivelActividad:      a.nivelActividad || '',
        tipoPaseos:          a.tipoPaseos || '',
        dondeDuerme:         a.dondeDuerme || '',
        escaleras:           a.escaleras || '',
        observaciones:       a.observaciones || '',
        objetivos:           a.objetivos || '',
      };

      await prisma.patient.update({
        where: { id: patientId },
        data: {
          name:      a.nombreAnimal || existing.name,
          species:   a.especieRaza?.split('/')[0]?.trim() || a.tipo || existing.species,
          breed:     a.especieRaza?.split('/')[1]?.trim() || existing.breed,
          birthDate: a.edadNacimiento || existing.birthDate,
          weight:    a.peso || existing.weight,
          sex:       a.sexo || existing.sex,
          neutered:  a.esterilizado || existing.neutered,
          photoUrl:  a.photoUrl || existing.photoUrl,
          diseases:  a.enfermedades || a.diseases || existing.diseases,
          allergies: a.alergias || a.allergies || existing.allergies,
        },
      });

      await prisma.intakeData.upsert({
        where:  { patientId },
        create: { patientId, ...intakeFields },
        update: intakeFields,
      });

      res.status(200).json({ success: true });
      return;
    }

    // Find or create tutor
    let tutor = await prisma.tutor.findFirst({
      where: { phone: d.telefono || '' },
    });

    if (!tutor) {
      tutor = await prisma.tutor.create({
        data: {
          name: d.nombreTutor || 'Sin nombre',
          phone: d.telefono || '',
          email: d.email || '',
          howFoundUs: d.comoNosConocio || '',
          portalEmail: d.email || null,
        },
      });
    } else if (!tutor.portalEmail && d.email) {
      try {
        tutor = await prisma.tutor.update({
          where: { id: tutor.id },
          data: { portalEmail: d.email },
        });
      } catch { /* email already taken by another tutor, skip */ }
    }

    let patients;

    if (Array.isArray(d.animals) && d.animals.length > 0) {
      // New multi-animal format: each animal has its full questionnaire
      patients = [];
      for (const animal of d.animals as AnimalData[]) {
        const p = await createPatientWithIntake(animal, tutor.id);
        patients.push(p);
      }
    } else {
      // Legacy single-animal format
      const patient = await createPatientWithIntake(d as AnimalData, tutor.id);
      patients = [patient];

      // Legacy extra animals (basic info only)
      if (Array.isArray(d.animalesExtra) && d.animalesExtra.length > 0) {
        for (const extra of d.animalesExtra) {
          if (!extra?.nombre) continue;
          await prisma.patient.create({
            data: {
              name: extra.nombre,
              species: extra.tipo || extra.raza?.split('/')[0]?.trim() || 'Perro',
              breed: extra.raza?.split('/')[1]?.trim() || extra.raza || '',
              birthDate: extra.edad || '',
              weight: extra.peso || '',
              sex: extra.sexo || '',
              neutered: extra.esterilizado || '',
              tutorId: tutor.id,
            },
          });
        }
      }
    }

    res.status(201).json({ success: true, patients });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: String(err) });
  }
});

export default router;
