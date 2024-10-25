import React from 'react';


interface EstimatedDeliveryDateProps {
  daysToDelivery: string;
}


// Funzione per aggiungere giorni lavorativi alla data di partenza
const addBusinessDays = (startDate, businessDays) => {
  const date = new Date(startDate);
  
  for (let i = 0; i < businessDays; i++) {
    date.setDate(date.getDate() + 1);

    // Se è sabato (6) o domenica (0), salta al prossimo giorno lavorativo
    if (date.getDay() === 6) {
      date.setDate(date.getDate() + 2); // Salta sabato e domenica
    } else if (date.getDay() === 0) {
      date.setDate(date.getDate() + 1); // Salta la domenica
    }
  }

  return date;
};

// Funzione per formattare la data come "Month day, Year"
const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

// Componente che visualizza l'intervallo di date stimato per la consegna
const EstimatedDeliveryDate = ({ daysToDelivery }) => {
  const currentDate = new Date(); // Usa la data attuale come startDate
  const estimatedStartDate = addBusinessDays(currentDate, daysToDelivery);
  const estimatedEndDate = addBusinessDays(estimatedStartDate, 2); // Aggiungi 2 giorni lavorativi per il range

  const formattedStartDate = formatDate(estimatedStartDate);
  const formattedEndDate = formatDate(estimatedEndDate);

  return (
    <><div className='estimated-text '>Estimated Delivery: </div><div className='estimated-date'>{formattedStartDate} – {formattedEndDate}</div></>
  );
};

export default EstimatedDeliveryDate;
