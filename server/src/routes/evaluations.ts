import { Router } from 'express';
import { prisma } from '../db';
import { z } from 'zod';
import { requireAuth } from '../middleware/auth';

const router = Router();
router.use(requireAuth);

const evalSchema = z.object({
  // Anamnesis
  cirugiasPrevias:        z.string().optional(),
  medicacionActual:       z.string().optional(),
  tratamientosAnteriores: z.string().optional(),
  respuestaTratamientos:  z.string().optional(),
  alergias:               z.string().optional(),
  sintomasReferidos:      z.string().optional(), // JSON
  otrosSintomas:          z.string().optional(),
  // Exploración estática
  posturaGeneral:         z.string().optional(),
  distribucionPeso:       z.string().optional(),
  estadoMuscularGeneral:  z.string().optional(),
  condicionCorporal:      z.coerce.number().int().min(1).max(9).optional(),
  masaMuscularWsava:      z.string().optional(),
  estadoPiel:             z.string().optional(),
  alineacionExtremidades: z.string().optional(),
  columnaVertebral:       z.string().optional(),
  cabezaCuello:           z.string().optional(),
  comportamientoReposo:   z.string().optional(),
  observacionesEstaticas: z.string().optional(),
  // Exploración dinámica
  tipoMarcha:             z.string().optional(),
  cojeraSiNo:             z.string().optional(),
  cojeraGrado:            z.coerce.number().int().min(1).max(4).optional(),
  cojeraMiembro:          z.string().optional(),
  inicioMarcha:           z.string().optional(),
  troteGalope:            z.string().optional(),
  subidaBajada:           z.string().optional(),
  proprioceptivePlacing:  z.string().optional(),
  marchaAlPaso:           z.string().optional(),
  marchaAlTrote:          z.string().optional(),
  analisisMiembros:       z.string().optional(),
  girosSentarse:          z.string().optional(),
  compensacionesDin:      z.string().optional(),
  observacionesDinamicas: z.string().optional(),
  // Palpación y ROM
  palpacionROM:           z.string().optional(), // JSON
  // Escalas
  dolorReposo:            z.coerce.number().int().min(0).max(10).optional(),
  dolorMovimiento:        z.coerce.number().int().min(0).max(10).optional(),
  nivelFuncional:         z.coerce.number().int().min(0).max(10).optional(),
  // Pruebas complementarias
  pruebasComplementarias: z.string().optional(), // JSON
  // Diagnóstico funcional
  hipotesisDiagnostica:    z.string().optional(),
  pronosticoFuncional:     z.string().optional(),
  limitacionesTratamiento: z.string().optional(),
  // Plan de tratamiento
  objetivoCortoplazo:      z.string().optional(),
  objetivoMedioplazo:      z.string().optional(),
  objetivoLargoplazo:      z.string().optional(),
  tecnicasPrevistas:       z.string().optional(), // JSON
  frecuenciaSemana:        z.coerce.number().int().positive().optional(),
  duracionSesionMin:       z.coerce.number().int().positive().optional(),
  reevaluacionPrevista:    z.string().optional(),
  fechaEvaluacion:         z.string().optional(),
});

// GET /evaluations/:patientId
router.get('/:patientId', async (req, res) => {
  const evaluation = await prisma.patientEvaluation.findUnique({
    where: { patientId: Number(req.params.patientId) },
  });
  if (!evaluation) { res.status(404).json({ error: 'Sin evaluación' }); return; }
  res.json(evaluation);
});

// PUT /evaluations/:patientId  (upsert)
router.put('/:patientId', async (req, res) => {
  const parse = evalSchema.safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }

  const data = {
    ...parse.data,
    reevaluacionPrevista: parse.data.reevaluacionPrevista
      ? new Date(parse.data.reevaluacionPrevista)
      : undefined,
    fechaEvaluacion: parse.data.fechaEvaluacion
      ? new Date(parse.data.fechaEvaluacion)
      : undefined,
  };

  const evaluation = await prisma.patientEvaluation.upsert({
    where:  { patientId: Number(req.params.patientId) },
    create: { patientId: Number(req.params.patientId), ...data },
    update: data,
  });
  res.json(evaluation);
});

export default router;
