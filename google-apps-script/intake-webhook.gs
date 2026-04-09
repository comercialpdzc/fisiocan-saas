/**
 * FISIOCAN — Google Apps Script
 * Conecta el formulario de Google Forms con el backend de FISIOCAN.
 *
 * INSTALACIÓN:
 * 1. Abre el Google Sheet vinculado al formulario
 * 2. Extensiones → Apps Script → pega este código
 * 3. Guarda y ejecuta "instalarTrigger" UNA sola vez
 * 4. Autoriza los permisos cuando te lo pida
 */

var BACKEND_URL = 'https://fisiocan-saas-800989742553.europe-west1.run.app/api/intake';

/**
 * Se ejecuta automáticamente cada vez que alguien envía el formulario.
 * El parámetro "e" contiene los valores del formulario.
 */
function onFormSubmit(e) {
  try {
    var v = e.namedValues;

    function get(key) {
      var val = v[key];
      return val ? val[0].trim() : '';
    }

    var payload = {
      // ── Animal ──────────────────────────────────────────────
      tipo:             get('Tipo de paciente'),
      nombreAnimal:     get('Nombre del animal'),
      especieRaza:      get('Especie / Raza'),
      edadNacimiento:   get('Fecha de nacimiento / Edad'),
      peso:             get('Peso'),
      sexo:             get('Sexo'),
      esterilizado:     get('¿Está esterilizado/a?'),

      // ── Tutor ───────────────────────────────────────────────
      nombreTutor:      get('Nombre del tutor/a'),
      telefono:         get('Teléfono'),
      email:            get('Email'),
      comoNosConocio:   get('¿Cómo nos conociste?'),

      // ── Motivo de consulta ──────────────────────────────────
      motivoConsulta:   get('Motivo de la consulta'),
      desdeCuando:      get('¿Desde cuándo?'),
      inicioSintomas:   get('Inicio de los síntomas'),
      momentosPeorMejor:get('¿En qué momentos está peor o mejor?'),
      sintomasObservados:get('Síntomas observados'),
      dolorAlComer:     get('¿Muestra dolor al comer o beber?'),

      // ── Historial clínico ───────────────────────────────────
      lesionesPrevias:  get('¿Ha tenido lesiones previas?'),
      cirugiaPrevia:    get('¿Ha tenido cirugía previa?'),
      cirugiaDetalle:   get('Detalle de la cirugía'),
      diagnosticoPrevio:get('Diagnóstico previo'),
      medicacion:       get('¿Toma medicación?'),
      medicacionDetalle:get('Detalle de la medicación'),
      fisioterapiaPrevia:get('¿Ha recibido fisioterapia antes?'),
      fisioterapiaDetalle:get('Detalle de fisioterapia anterior'),
      mejoriaCon:       get('¿Con qué mejora?'),
      veterinarioRef:   get('Veterinario de referencia'),

      // ── Estilo de vida ──────────────────────────────────────
      nivelActividad:   get('Nivel de actividad'),
      tipoPaseos:       get('Tipo de paseos'),
      dondeDuerme:      get('¿Dónde duerme?'),
      escaleras:        get('¿Sube escaleras?'),

      // ── Observaciones ───────────────────────────────────────
      observaciones:    get('Observaciones adicionales'),
      objetivos:        get('Objetivos del tratamiento'),
    };

    var options = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true,
    };

    var response = UrlFetchApp.fetch(BACKEND_URL, options);
    var code = response.getResponseCode();

    if (code !== 201) {
      Logger.log('ERROR al enviar a FISIOCAN: ' + code + ' — ' + response.getContentText());
    } else {
      Logger.log('OK — Paciente creado: ' + response.getContentText());
    }

  } catch (err) {
    Logger.log('EXCEPCION en onFormSubmit: ' + err.toString());
  }
}

/**
 * Ejecuta esta función UNA sola vez para instalar el trigger automático.
 * Extensiones → Apps Script → selecciona "instalarTrigger" → ▶ Ejecutar
 */
function instalarTrigger() {
  // Eliminar triggers anteriores del mismo tipo para evitar duplicados
  var triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function(t) {
    if (t.getHandlerFunction() === 'onFormSubmit') {
      ScriptApp.deleteTrigger(t);
    }
  });

  // Instalar trigger de envío de formulario
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ScriptApp.newTrigger('onFormSubmit')
    .forSpreadsheet(ss)
    .onFormSubmit()
    .create();

  Logger.log('Trigger instalado correctamente.');
}
