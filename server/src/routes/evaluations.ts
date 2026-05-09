import { Router } from 'express';
import { prisma } from '../db';
import { z } from 'zod';
import { requireAuth } from '../middleware/auth';

const router = Router();
router.use(requireAuth);

// DB returns null for unset fields; inputs may send "" for empty numbers.
// strOpt: accepts string | null | undefined
// numOpt: "" | null | undefined → undefined, else coerce to number
const strOpt = z.string().nullish();
const numOpt = (schema: z.ZodNumber) =>
  z.preprocess(v => (v === '' || v == null) ? undefined : Number(v), schema.optional());

const evalSchema = z.object({
  // Anamnesis
  cirugiasPrevias:        strOpt,
  medicacionActual:       strOpt,
  tratamientosAnteriores: strOpt,
  respuestaTratamientos:  strOpt,
  alergias:               strOpt,
  sintomasReferidos:      strOpt,
  otrosSintomas:          strOpt,
  // Exploración estática
  posturaGeneral:         strOpt,
  distribucionPeso:       strOpt,
  estadoMuscularGeneral:  strOpt,
  condicionCorporal:      numOpt(z.number().int().min(1).max(9)),
  masaMuscularWsava:      strOpt,
  estadoPiel:             strOpt,
  alineacionExtremidades: strOpt,
  columnaVertebral:       strOpt,
  cabezaCuello:           strOpt,
  comportamientoReposo:   strOpt,
  observacionesEstaticas: strOpt,
  // Exploración dinámica
  tipoMarcha:             strOpt,
  cojeraSiNo:             strOpt,
  cojeraGrado:            numOpt(z.number().int().min(1).max(4)),
  cojeraMiembro:          strOpt,
  inicioMarcha:           strOpt,
  troteGalope:            strOpt,
  subidaBajada:           strOpt,
  proprioceptivePlacing:  strOpt,
  marchaAlPaso:           strOpt,
  marchaAlTrote:          strOpt,
  analisisMiembros:       strOpt,
  girosSentarse:          strOpt,
  compensacionesDin:      strOpt,
  observacionesDinamicas: strOpt,
  // Palpación y ROM
  palpacionROM:           strOpt,
  // Escalas
  dolorReposo:            numOpt(z.number().int().min(0).max(10)),
  dolorMovimiento:        numOpt(z.number().int().min(0).max(10)),
  nivelFuncional:         numOpt(z.number().int().min(0).max(10)),
  // Pruebas complementarias
  pruebasComplementarias: strOpt,
  // Diagnóstico funcional
  hipotesisDiagnostica:    strOpt,
  pronosticoFuncional:     strOpt,
  limitacionesTratamiento: strOpt,
  // Plan de tratamiento
  objetivoCortoplazo:      strOpt,
  objetivoMedioplazo:      strOpt,
  objetivoLargoplazo:      strOpt,
  tecnicasPrevistas:       strOpt,
  frecuenciaSemana:        numOpt(z.number().int().positive()),
  duracionSesionMin:       numOpt(z.number().int().positive()),
  reevaluacionPrevista:    strOpt,
  fechaEvaluacion:         strOpt,
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
  if (!parse.success) {
    console.error('[PUT /evaluations] validation error:', JSON.stringify(parse.error.flatten(), null, 2));
    res.status(400).json({ error: JSON.stringify(parse.error.flatten()) });
    return;
  }

  const data = {
    ...parse.data,
    reevaluacionPrevista: parse.data.reevaluacionPrevista
      ? new Date(parse.data.reevaluacionPrevista)
      : null,
    fechaEvaluacion: parse.data.fechaEvaluacion
      ? new Date(parse.data.fechaEvaluacion)
      : null,
  };

  try {
    const evaluation = await prisma.patientEvaluation.upsert({
      where:  { patientId: Number(req.params.patientId) },
      create: { patientId: Number(req.params.patientId), ...data },
      update: data,
    });
    res.json(evaluation);
  } catch (err: any) {
    console.error('[PUT /evaluations] prisma error:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
