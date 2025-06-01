import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer, Event, View } from "react-big-calendar";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { parseISO, format as dfFormat, parse as dfParse, startOfWeek as dfStartOfWeek, getDay as dfGetDay } from "date-fns";
import { es } from "date-fns/locale";
import type { Locale } from "date-fns";
import Layout from "../layout/Layout";
import { getAllSolicitudesAsync } from "../Solicitudes/solicitudesSlice";
import Modal from "react-modal";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Capitaliza la primera letra de una cadena
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const locales = { es };

const localizer = dateFnsLocalizer({
  format: (date: Date, formatStr: string, options?: { locale?: Locale }) =>
    dfFormat(date, formatStr, { ...(options || {}), locale: es }),
  parse: (value: string, formatStr: string, backupDate: Date, options?: { locale?: Locale }) =>
    dfParse(value, formatStr, backupDate, { ...(options || {}), locale: es }),
  startOfWeek: (date: Date, options?: { locale?: Locale }) =>
    dfStartOfWeek(date, { ...(options || {}), locale: es }),
  getDay: (date: Date) => dfGetDay(date),
  locales,
});
Modal.setAppElement("#root");

// Formatos personalizados en español y capitalizados
const formats = {
  dateFormat: "d",
  dayFormat: (date: Date, _culture: string | undefined, _localizer: any) =>
    capitalize(dfFormat(date, "eee dd", { locale: es })), // Ej: "Lun 01"
  weekdayFormat: (date: Date, _culture: string | undefined, _localizer: any) =>
    capitalize(dfFormat(date, "eeee", { locale: es })), // Ej: "Lunes"
  monthHeaderFormat: (date: Date, _culture: string | undefined, _localizer: any) =>
    capitalize(dfFormat(date, "MMMM yyyy", { locale: es })), // Ej: "Mayo 2025"
  dayHeaderFormat: (date: Date, _culture: string | undefined, _localizer: any) =>
    capitalize(dfFormat(date, "eeee d MMMM", { locale: es })), // Ej: "Lunes 1 mayo"
  dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
    `${capitalize(dfFormat(start, "d MMM", { locale: es }))} - ${capitalize(dfFormat(end, "d MMM", { locale: es }))}`,
  agendaDateFormat: (date: Date, _culture: string | undefined, _localizer: any) =>
    capitalize(dfFormat(date, "eeee d MMMM", { locale: es })),
  agendaTimeFormat: "HH:mm",
  agendaHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
    `${capitalize(dfFormat(start, "d MMM", { locale: es }))} - ${capitalize(dfFormat(end, "d MMM", { locale: es }))}`,
};

function CalendarioSolicitudes() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const solicitudes = useSelector((state: any) => state.solicitudes.solicitudes);

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<View>("month");

  useEffect(() => {
    dispatch(getAllSolicitudesAsync());
  }, [dispatch]);

  const events: Event[] = solicitudes.map((solicitud: any) => ({
    id: solicitud.id,
    title: `📅 ${solicitud.usuario?.name} - ${solicitud.mascota?.nombre}`,
    start: parseISO(solicitud.fecha_solicitud),
    end: parseISO(solicitud.fecha_solicitud),
    allDay: true,
    resource: solicitud
  }));

  const eventStyleGetter = (event: Event) => {
    const estado = (event.resource as any)?.estado;
    let backgroundColor = "#999";
    if (estado === "pendiente") backgroundColor = "orange";
    if (estado === "aprobada") backgroundColor = "green";
    if (estado === "rechazada") backgroundColor = "red";

    return {
      style: {
        backgroundColor,
        color: "white",
        borderRadius: "5px",
        border: "none",
        padding: "5px"
      }
    };
  };

  const messages = {
    today: "Hoy",
    previous: "Anterior",
    next: "Siguiente",
    month: "Mes",
    week: "Semana",
    day: "Día",
    agenda: "Agenda",
    date: "Fecha",
    time: "Hora",
    event: "Evento",
    noEventsInRange: "No hay eventos en este rango",
    allDay: "Todo el día"
  };

  return (
    <Layout>
      <div style={{ padding: "20px" }}>
        <h1>Calendario de Solicitudes</h1>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          eventPropGetter={eventStyleGetter}
          messages={messages}
          formats={formats}
          views={["month", "week", "day", "agenda"]}
          date={currentDate}
          onNavigate={(date) => setCurrentDate(date)}
          view={currentView}
          onView={(view) => setCurrentView(view)}
          onSelectEvent={(event) => setSelectedEvent(event)}
          culture="es"
        />

        <Modal
          isOpen={!!selectedEvent}
          onRequestClose={() => setSelectedEvent(null)}
          contentLabel="Detalles de la Solicitud"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1000
            },
            content: {
              backgroundColor:
                selectedEvent?.resource?.estado === "pendiente"
                  ? "orange"
                  : selectedEvent?.resource?.estado === "aprobada"
                  ? "green"
                  : "red",
              color: "white",
              borderRadius: "12px",
              padding: "30px 20px 20px",
              width: "90%",
              maxWidth: "400px",
              maxHeight: "90vh",
              margin: "auto",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
            }
          }}
        >
          {selectedEvent && (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setSelectedEvent(null)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "transparent",
                  border: "none",
                  color: "white",
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
                aria-label="Cerrar"
              >
                &times;
              </button>

              <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                {selectedEvent.title}
              </h2>

              <div style={{ lineHeight: "1.6", padding: "0 5px" }}>
                <p>
                  <strong>Fecha:</strong>{" "}
                  {capitalize(dfFormat(selectedEvent.start as Date, "eeee, d 'de' MMMM 'de' yyyy", { locale: es }))}
                </p>
                <p><strong>Usuario:</strong> {selectedEvent.resource?.usuario?.name}</p>
                <p><strong>Email:</strong> {selectedEvent.resource?.usuario?.email}</p>
                <p><strong>Mascota:</strong> {selectedEvent.resource?.mascota?.nombre}</p>
                <p><strong>Tipo:</strong> {selectedEvent.resource?.tipo}</p>
                <p><strong>Estado:</strong> {selectedEvent.resource?.estado}</p>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </Layout>
  );
}

export default CalendarioSolicitudes;
