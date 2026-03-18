import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import { Icon } from 'leaflet';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';

const customIcon = new Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const serviceAreas = [
  { name: 'Águilas', coords: [37.4056, -1.5797], type: 'main' },
  { name: 'San Juan de los Terreros', coords: [37.2436, -1.4294], type: 'service' },
  { name: 'Pulpí', coords: [37.3879, -1.6308], type: 'service' },
  { name: 'Lorca', coords: [37.6763, -1.6967], type: 'service' },
];

export default function ServiceAreaMap({ title, subtitle }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 lg:py-24 bg-background"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{title}</h2>
            {subtitle && <p className="text-muted-foreground text-lg">{subtitle}</p>}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Map */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden border shadow-lg h-96 lg:h-[500px]">
            <MapContainer
              center={[37.4056, -1.5797]}
              zoom={10}
              scrollWheelZoom={true}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Service coverage circle */}
              <CircleMarker
                center={[37.4056, -1.5797]}
                radius={35}
                color="hsl(142, 60%, 35%)"
                fillColor="hsl(142, 60%, 35%)"
                fillOpacity={0.1}
                weight={2}
              />

              {serviceAreas.map((area, idx) => (
                <Marker key={idx} position={area.coords} icon={customIcon}>
                  <Popup className="font-inter">
                    <div className="p-2">
                      <p className="font-semibold text-sm">{area.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {area.type === 'main' ? 'Main Office' : 'Service Area'}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Service Areas List */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold">Service Areas</h3>
            </div>

            {serviceAreas.map((area, idx) => (
              <motion.div
                key={area.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${area.type === 'main' ? 'bg-primary' : 'bg-accent-foreground'}`} />
                  <div>
                    <p className="font-semibold text-sm">{area.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {area.type === 'main' ? 'Headquarters' : 'Service Coverage'}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}