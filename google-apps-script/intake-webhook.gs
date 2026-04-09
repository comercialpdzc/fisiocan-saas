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
      // Enviar email de bienvenida si hay email
      var email = payload.email;
      var nombre = payload.nombreTutor;
      var animal = payload.nombreAnimal;
      if (email) {
        enviarEmailBienvenida(email, nombre, animal);
      }
    }

  } catch (err) {
    Logger.log('EXCEPCION en onFormSubmit: ' + err.toString());
  }
}

/**
 * Envía un email de bienvenida al tutor con el enlace al portal.
 */
function enviarEmailBienvenida(email, nombreTutor, nombreAnimal) {
  var asunto = 'Bienvenido/a a FISIOCAN — Accede al portal de ' + nombreAnimal;

  var cuerpo = 'Hola ' + nombreTutor + ',\n\n'
    + 'Hemos recibido correctamente la ficha de ' + nombreAnimal + '. '
    + 'Nos pondremos en contacto contigo pronto para confirmar vuestra primera cita.\n\n'
    + 'Mientras tanto, ya puedes acceder a tu portal de cliente donde podrás ver '
    + 'las citas, los ejercicios de rehabilitación, los planes de tratamiento '
    + 'y contactar directamente con tu fisioterapeuta:\n\n'
    + '👉 https://fisiocan.vercel.app/portal\n\n'
    + 'Inicia sesión con el mismo Gmail que usaste al rellenar este formulario (' + email + ').\n\n'
    + 'Un saludo,\n'
    + 'El equipo de FISIOCAN\n'
    + '────────────────────\n'
    + 'Fisioterapia veterinaria\n'
    + 'https://fisiocan.vercel.app';

  var cuerpoHtml = '<p>Hola <strong>' + nombreTutor + '</strong>,</p>'
    + '<p>Hemos recibido correctamente la ficha de <strong>' + nombreAnimal + '</strong>. '
    + 'Nos pondremos en contacto contigo pronto para confirmar vuestra primera cita.</p>'
    + '<p>Mientras tanto, ya puedes acceder a tu <strong>portal de cliente</strong> donde podrás ver '
    + 'las citas, los ejercicios de rehabilitación, los planes de tratamiento '
    + 'y contactar directamente con tu fisioterapeuta:</p>'
    + '<p style="text-align:center;margin:24px 0;">'
    + '<a href="https://fisiocan.vercel.app/portal" '
    + 'style="background:#0f766e;color:white;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:16px;">'
    + 'Acceder al portal →'
    + '</a></p>'
    + '<p style="color:#64748b;font-size:14px;">Inicia sesión con el Gmail que usaste al rellenar este formulario: <strong>' + email + '</strong></p>'
    + '<hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;">'
    + '<p style="color:#94a3b8;font-size:12px;">FISIOCAN · Fisioterapia veterinaria</p>';

  try {
    MailApp.sendEmail({
      to: email,
      subject: asunto,
      body: cuerpo,
      htmlBody: cuerpoHtml,
    });
    Logger.log('Email de bienvenida enviado a ' + email);
  } catch (err) {
    Logger.log('ERROR al enviar email: ' + err.toString());
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
