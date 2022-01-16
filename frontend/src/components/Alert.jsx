import React from 'react';
import { useAppContext } from '../context/app_context';

export default function Alert() {
   const { alertType, alertText } = useAppContext();
   return (
      <div className={`alert alert-${alertType}`}>
         {alertText}
      </div>
   )
}
