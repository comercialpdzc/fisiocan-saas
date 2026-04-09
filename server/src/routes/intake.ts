import { Router } from 'express';
import { prisma } from '../db';

const router = Router();


// Public endpoint — called from the intake form (no auth required)
// Accepts same field names as the Google Apps Script
router.post('/', async (req, res) => {
  try {
    const d = req.body;

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
        },
      });
    }

    // Create patient
    const patient = await prisma.patient.create({
      data: {
        name: d.nombreAnimal || 'Sin nombre',
        species: d.especieRaza?.split('/')[0]?.trim() || d.tipo || 'Perro',
        breed: d.especieRaza?.split('/')[1]?.trim() || '',
        birthDate: d.edadNacimiento || '',
        weight: d.peso || '',
        sex: d.sexo || '',
        neutered: d.esterilizado || '',
        tutorId: tutor.id,
        intakeData: {
          create: {
            motivoConsulta: d.motivoConsulta || '',
            desdeCuando: d.desdeCuando || '',
            inicioSintomas: d.inicioSintomas || '',
            momentosPeorMejor: d.momentosPeorMejor || '',
            sintomasObservados: d.sintomasObservados || '',
            dolorAlComer: d.dolorAlComer || '',
            lesionesPrevias: d.lesionesPrevias || '',
            cirugiaPrevia: d.cirugiaPrevia || '',
            cirugiaDetalle: d.cirugiaDetalle || '',
            diagnosticoPrevio: d.diagnosticoPrevio || '',
            medicacion: d.medicacion || '',
            medicacionDetalle: d.medicacionDetalle || '',
            fisioterapiaPrevia: d.fisioterapiaPrevia || '',
            fisioterapiaDetalle: d.fisioterapiaDetalle || '',
            mejoriaCon: d.mejoriaCon || '',
            veterinarioRef: d.veterinarioRef || '',
            nivelActividad: d.nivelActividad || '',
            tipoPaseos: d.tipoPaseos || '',
            dondeDuerme: d.dondeDuerme || '',
            escaleras: d.escaleras || '',
            observaciones: d.observaciones || '',
            objetivos: d.objetivos || '',
          },
        },
      },
      include: { tutor: true, intakeData: true },
    });

    res.status(201).json({ success: true, patient });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: String(err) });
  }
});

export default router;
