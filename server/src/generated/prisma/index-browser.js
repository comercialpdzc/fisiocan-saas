
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  password: 'password',
  name: 'name',
  role: 'role',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TutorScalarFieldEnum = {
  id: 'id',
  name: 'name',
  phone: 'phone',
  email: 'email',
  howFoundUs: 'howFoundUs',
  portalEmail: 'portalEmail',
  portalPassword: 'portalPassword',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PatientScalarFieldEnum = {
  id: 'id',
  name: 'name',
  species: 'species',
  breed: 'breed',
  birthDate: 'birthDate',
  weight: 'weight',
  sex: 'sex',
  neutered: 'neutered',
  photoUrl: 'photoUrl',
  diseases: 'diseases',
  allergies: 'allergies',
  active: 'active',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  tutorId: 'tutorId'
};

exports.Prisma.IntakeDataScalarFieldEnum = {
  id: 'id',
  patientId: 'patientId',
  motivoConsulta: 'motivoConsulta',
  desdeCuando: 'desdeCuando',
  inicioSintomas: 'inicioSintomas',
  momentosPeorMejor: 'momentosPeorMejor',
  sintomasObservados: 'sintomasObservados',
  dolorAlComer: 'dolorAlComer',
  lesionesPrevias: 'lesionesPrevias',
  cirugiaPrevia: 'cirugiaPrevia',
  cirugiaDetalle: 'cirugiaDetalle',
  diagnosticoPrevio: 'diagnosticoPrevio',
  medicacion: 'medicacion',
  medicacionDetalle: 'medicacionDetalle',
  fisioterapiaPrevia: 'fisioterapiaPrevia',
  fisioterapiaDetalle: 'fisioterapiaDetalle',
  mejoriaCon: 'mejoriaCon',
  veterinarioRef: 'veterinarioRef',
  nivelActividad: 'nivelActividad',
  tipoPaseos: 'tipoPaseos',
  dondeDuerme: 'dondeDuerme',
  escaleras: 'escaleras',
  observaciones: 'observaciones',
  objetivos: 'objetivos',
  enfermedades: 'enfermedades',
  alergias: 'alergias',
  createdAt: 'createdAt'
};

exports.Prisma.AppointmentScalarFieldEnum = {
  id: 'id',
  date: 'date',
  duration: 'duration',
  notes: 'notes',
  status: 'status',
  googleEventId: 'googleEventId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  patientId: 'patientId',
  fisioId: 'fisioId'
};

exports.Prisma.AppointmentPatientScalarFieldEnum = {
  id: 'id',
  appointmentId: 'appointmentId',
  patientId: 'patientId',
  createdAt: 'createdAt'
};

exports.Prisma.RehabRoutineScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  videoUrl: 'videoUrl',
  pdfUrl: 'pdfUrl',
  duration: 'duration',
  category: 'category',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PatientRoutineScalarFieldEnum = {
  id: 'id',
  patientId: 'patientId',
  routineId: 'routineId',
  assignedAt: 'assignedAt',
  notes: 'notes'
};

exports.Prisma.PlanScalarFieldEnum = {
  id: 'id',
  title: 'title',
  type: 'type',
  content: 'content',
  patientId: 'patientId',
  createdById: 'createdById',
  pinned: 'pinned',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PatientEvaluationScalarFieldEnum = {
  id: 'id',
  patientId: 'patientId',
  cirugiasPrevias: 'cirugiasPrevias',
  medicacionActual: 'medicacionActual',
  tratamientosAnteriores: 'tratamientosAnteriores',
  respuestaTratamientos: 'respuestaTratamientos',
  alergias: 'alergias',
  sintomasReferidos: 'sintomasReferidos',
  otrosSintomas: 'otrosSintomas',
  posturaGeneral: 'posturaGeneral',
  distribucionPeso: 'distribucionPeso',
  estadoMuscularGeneral: 'estadoMuscularGeneral',
  condicionCorporal: 'condicionCorporal',
  estadoPiel: 'estadoPiel',
  observacionesEstaticas: 'observacionesEstaticas',
  tipoMarcha: 'tipoMarcha',
  cojeraSiNo: 'cojeraSiNo',
  cojeraGrado: 'cojeraGrado',
  cojeraMiembro: 'cojeraMiembro',
  inicioMarcha: 'inicioMarcha',
  troteGalope: 'troteGalope',
  subidaBajada: 'subidaBajada',
  proprioceptivePlacing: 'proprioceptivePlacing',
  observacionesDinamicas: 'observacionesDinamicas',
  palpacionROM: 'palpacionROM',
  dolorReposo: 'dolorReposo',
  dolorMovimiento: 'dolorMovimiento',
  nivelFuncional: 'nivelFuncional',
  pruebasComplementarias: 'pruebasComplementarias',
  hipotesisDiagnostica: 'hipotesisDiagnostica',
  pronosticoFuncional: 'pronosticoFuncional',
  limitacionesTratamiento: 'limitacionesTratamiento',
  objetivoCortoplazo: 'objetivoCortoplazo',
  objetivoMedioplazo: 'objetivoMedioplazo',
  objetivoLargoplazo: 'objetivoLargoplazo',
  tecnicasPrevistas: 'tecnicasPrevistas',
  frecuenciaSemana: 'frecuenciaSemana',
  duracionSesionMin: 'duracionSesionMin',
  reevaluacionPrevista: 'reevaluacionPrevista',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SessionFollowupScalarFieldEnum = {
  id: 'id',
  patientId: 'patientId',
  appointmentId: 'appointmentId',
  sessionNumber: 'sessionNumber',
  fisioId: 'fisioId',
  date: 'date',
  durationMin: 'durationMin',
  dolorReferido: 'dolorReferido',
  movilidadReferida: 'movilidadReferida',
  actividadCasa: 'actividadCasa',
  actividadNotas: 'actividadNotas',
  medicacionCambios: 'medicacionCambios',
  medicacionDetalle: 'medicacionDetalle',
  incidenciasDesde: 'incidenciasDesde',
  observacionesTutor: 'observacionesTutor',
  dolorReposoRapido: 'dolorReposoRapido',
  dolorMovimientoRapido: 'dolorMovimientoRapido',
  rangoMovimiento: 'rangoMovimiento',
  nivelFuncionalRapido: 'nivelFuncionalRapido',
  posturaPeso: 'posturaPeso',
  marchaRapida: 'marchaRapida',
  cojeraGradoRapido: 'cojeraGradoRapido',
  cojeraMiembroRapido: 'cojeraMiembroRapido',
  tonoMuscular: 'tonoMuscular',
  proprioceptiveRapido: 'proprioceptiveRapido',
  hallazgosPalpacion: 'hallazgosPalpacion',
  tecnicasRealizadas: 'tecnicasRealizadas',
  descripcionTratamiento: 'descripcionTratamiento',
  respuestaInmediata: 'respuestaInmediata',
  dolorPostSesion: 'dolorPostSesion',
  tolerancia: 'tolerancia',
  observacionesSesion: 'observacionesSesion',
  evolucionGeneral: 'evolucionGeneral',
  objetivosAlcanzados: 'objetivosAlcanzados',
  modificacionPlan: 'modificacionPlan',
  modificacionDetalle: 'modificacionDetalle',
  comentariosEvolucion: 'comentariosEvolucion',
  ejerciciosRecomendaciones: 'ejerciciosRecomendaciones',
  restriccionesActividad: 'restriccionesActividad',
  calorFrioEnCasa: 'calorFrioEnCasa',
  otrasIndicaciones: 'otrasIndicaciones',
  fechaProximaSesion: 'fechaProximaSesion',
  frecuenciaProxima: 'frecuenciaProxima',
  objetivosProxima: 'objetivosProxima',
  alertasSigns: 'alertasSigns',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MediaFileScalarFieldEnum = {
  id: 'id',
  patientId: 'patientId',
  sessionId: 'sessionId',
  evaluationId: 'evaluationId',
  tutorId: 'tutorId',
  driveFileId: 'driveFileId',
  driveUrl: 'driveUrl',
  thumbnailUrl: 'thumbnailUrl',
  localUrl: 'localUrl',
  fileType: 'fileType',
  originType: 'originType',
  description: 'description',
  createdAt: 'createdAt'
};

exports.Prisma.GmailContactScalarFieldEnum = {
  id: 'id',
  email: 'email',
  name: 'name',
  type: 'type',
  brainNoteId: 'brainNoteId',
  lastContactAt: 'lastContactAt',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FollowUpMediaScalarFieldEnum = {
  id: 'id',
  patientId: 'patientId',
  url: 'url',
  mediaType: 'mediaType',
  caption: 'caption',
  createdAt: 'createdAt'
};

exports.Prisma.PatientMediaScalarFieldEnum = {
  id: 'id',
  patientId: 'patientId',
  url: 'url',
  mediaType: 'mediaType',
  caption: 'caption',
  takenAt: 'takenAt',
  createdAt: 'createdAt'
};

exports.Prisma.MessageScalarFieldEnum = {
  id: 'id',
  body: 'body',
  createdAt: 'createdAt',
  readAt: 'readAt',
  fisioId: 'fisioId',
  tutorId: 'tutorId',
  fromTutor: 'fromTutor'
};

exports.Prisma.BrainNoteScalarFieldEnum = {
  id: 'id',
  title: 'title',
  content: 'content',
  tags: 'tags',
  originType: 'originType',
  sourceRef: 'sourceRef',
  x: 'x',
  y: 'y',
  z: 'z',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BrainSynapseScalarFieldEnum = {
  id: 'id',
  nodeIdA: 'nodeIdA',
  nodeIdB: 'nodeIdB',
  strength: 'strength',
  count: 'count',
  firstLinkedAt: 'firstLinkedAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BrainIndexedMessageScalarFieldEnum = {
  id: 'id',
  messageId: 'messageId',
  indexedAt: 'indexedAt'
};

exports.Prisma.BrainConversationScalarFieldEnum = {
  id: 'id',
  title: 'title',
  createdAt: 'createdAt'
};

exports.Prisma.BrainMessageScalarFieldEnum = {
  id: 'id',
  role: 'role',
  content: 'content',
  createdAt: 'createdAt',
  conversationId: 'conversationId'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  User: 'User',
  Tutor: 'Tutor',
  Patient: 'Patient',
  IntakeData: 'IntakeData',
  Appointment: 'Appointment',
  AppointmentPatient: 'AppointmentPatient',
  RehabRoutine: 'RehabRoutine',
  PatientRoutine: 'PatientRoutine',
  Plan: 'Plan',
  PatientEvaluation: 'PatientEvaluation',
  SessionFollowup: 'SessionFollowup',
  MediaFile: 'MediaFile',
  GmailContact: 'GmailContact',
  FollowUpMedia: 'FollowUpMedia',
  PatientMedia: 'PatientMedia',
  Message: 'Message',
  BrainNote: 'BrainNote',
  BrainSynapse: 'BrainSynapse',
  BrainIndexedMessage: 'BrainIndexedMessage',
  BrainConversation: 'BrainConversation',
  BrainMessage: 'BrainMessage'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
