import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJtckBTE3-ub4JP6NcEJX_PKao7r0YJRw",
  authDomain: "dtustudenthub.firebaseapp.com",
  projectId: "dtustudenthub",
  storageBucket: "dtustudenthub.appspot.com",
  messagingSenderId: "400034264848",
  appId: "1:400034264848:web:f065a4bb76463063dd5795",
  measurementId: "G-M5K2EJKLEL"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();

const colRef = collection(db, 'appointments');


export function addAppointmentToFirebase (appointmentTitle, date, startTime, endTime, location) {
    document.querySelector('.add')
    let formattedDate = new Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(date);
    let formattedEndTime = new Intl.DateTimeFormat('en-GB', {hour: '2-digit', minute: '2-digit'}).format(endTime);
    let formattedStartTime = new Intl.DateTimeFormat('en-GB', {hour: '2-digit', minute: '2-digit'}).format(startTime); 

    //to timestamp
    var startDate = formattedDate.split("/");
    startDate = startDate[2] + "-" + startDate[1] + "-" + startDate[0];
    startDate = startDate + "T" + formattedStartTime;
    console.log(startDate);

    //to timestamp
    var endDate = formattedDate.split("/");
    endDate = endDate[2] + "-" + endDate[1] + "-" + endDate[0];
    endDate = endDate + "T" + formattedEndTime;
    console.log(endDate);
    
        addDoc(colRef, {
            title: appointmentTitle,
            startDate: startDate,
            endDate: endDate,
            //location: location
        })
        .then(( ) => {
    
        })
};

export const GetAppointmentsFromFirebase = () => {
    let [schedulerData, setSchedulerData] = useState([])
    useEffect(() => {
    getDocs(colRef)
        .then((snapshot) => {
            let appointmentData = []
            snapshot.docs.forEach((doc) => {
                appointmentData.push({ ...doc.data() })
                })
            setSchedulerData(appointmentData);
            console.log(appointmentData)
            })
            .catch(err => {
                console.log(err.message)
            })
        }, []); 
    return schedulerData;
};



