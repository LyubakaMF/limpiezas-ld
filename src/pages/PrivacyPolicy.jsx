import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-2">Política de Privacidad</h1>
        <p className="text-muted-foreground mb-10">Última actualización: 27 de abril de 2026</p>

        <div className="prose prose-slate max-w-none space-y-8 text-foreground">

          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Responsable del tratamiento</h2>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Limpiezas LD</strong> es la empresa responsable del tratamiento de sus datos personales.<br />
              Teléfono: +34 643 53 34 53 / +34 602 66 55 37<br />
              Correo electrónico: <a href="mailto:limpiezasld@gmail.com" className="text-primary hover:underline">limpiezasld@gmail.com</a><br />
              Zona de servicio: Águilas, San Juan de los Terreros, Pulpí y Lorca (Región de Murcia, España)
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Datos que recopilamos</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">Recopilamos los siguientes datos personales cuando usted rellena nuestro formulario de contacto o reserva:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Nombre completo</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono</li>
              <li>Dirección del inmueble</li>
              <li>Tipo de servicio solicitado</li>
              <li>Fecha y hora preferida</li>
              <li>Fotos o vídeos del inmueble (si se adjuntan)</li>
              <li>Cualquier información adicional que usted nos proporcione voluntariamente</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Finalidad del tratamiento</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">Utilizamos sus datos para:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Gestionar y confirmar reservas de servicios de limpieza</li>
              <li>Enviarle presupuestos personalizados</li>
              <li>Comunicarnos con usted sobre su solicitud</li>
              <li>Mejorar nuestros servicios</li>
              <li>Cumplir con nuestras obligaciones legales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Base legal</h2>
            <p className="text-muted-foreground leading-relaxed">
              El tratamiento de sus datos se basa en su consentimiento explícito al rellenar y enviar nuestro formulario de contacto, así como en la ejecución de un contrato de prestación de servicios (Art. 6.1.a y 6.1.b del RGPD).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Conservación de los datos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Sus datos se conservarán durante el tiempo necesario para la prestación del servicio y, posteriormente, durante los plazos legalmente establecidos. Una vez finalizada la relación comercial, los datos serán bloqueados y eliminados conforme a la normativa vigente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Cesión de datos a terceros</h2>
            <p className="text-muted-foreground leading-relaxed">
              No cedemos sus datos personales a terceros, salvo obligación legal. Sus datos pueden ser procesados por proveedores de servicios tecnológicos (como plataformas de envío de correo electrónico) bajo acuerdos de confidencialidad y únicamente para prestar el servicio solicitado.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Cookies y tecnologías de seguimiento</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nuestro sitio web puede utilizar cookies propias y de terceros (como Google Analytics y Google Ads) para analizar el tráfico y mejorar nuestros servicios. Puede gestionar sus preferencias de cookies en cualquier momento a través del banner de cookies que aparece al acceder al sitio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Sus derechos</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">De conformidad con el RGPD y la LOPDGDD, usted tiene derecho a:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li><strong>Acceso:</strong> conocer qué datos tratamos sobre usted</li>
              <li><strong>Rectificación:</strong> corregir datos inexactos</li>
              <li><strong>Supresión:</strong> solicitar la eliminación de sus datos</li>
              <li><strong>Oposición:</strong> oponerse al tratamiento de sus datos</li>
              <li><strong>Portabilidad:</strong> recibir sus datos en formato electrónico</li>
              <li><strong>Limitación:</strong> solicitar la limitación del tratamiento</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Para ejercer sus derechos, puede contactarnos en: <a href="mailto:limpiezasld@gmail.com" className="text-primary hover:underline">limpiezasld@gmail.com</a> o llamarnos al +34 643 53 34 53.
              También tiene derecho a presentar una reclamación ante la <strong>Agencia Española de Protección de Datos (AEPD)</strong>: <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.aepd.es</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Seguridad</h2>
            <p className="text-muted-foreground leading-relaxed">
              Aplicamos medidas técnicas y organizativas adecuadas para proteger sus datos personales contra el acceso no autorizado, pérdida o destrucción, de conformidad con el RGPD.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Cambios en esta política</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nos reservamos el derecho de actualizar esta política de privacidad. Le notificaremos cualquier cambio significativo a través de nuestro sitio web. Le recomendamos revisar esta página periódicamente.
            </p>
          </section>

          <section className="border-t pt-6">
            <p className="text-sm text-muted-foreground">
              © 2026 Limpiezas LD · Región de Murcia, España · <a href="mailto:limpiezasld@gmail.com" className="text-primary hover:underline">limpiezasld@gmail.com</a> · +34 643 53 34 53
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}