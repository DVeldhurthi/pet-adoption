import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Calendar = ({ selectedDate, onDateChange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const isSelected = (day) => {
    return selectedDate &&
      day === selectedDate.getDate() &&
      currentMonth.getMonth() === selectedDate.getMonth() &&
      currentMonth.getFullYear() === selectedDate.getFullYear();
  };

  return (
    <div className="calendar">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <button className="btn btn-outline-primary" onClick={prevMonth}>&lt;</button>
        <span className="font-weight-bold">{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
        <button className="btn btn-outline-primary" onClick={nextMonth}>&gt;</button>
      </div>
      <div className="row row-cols-7 g-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="col text-center font-weight-bold">{day}</div>
        ))}
        {blanks.map(blank => (
          <div key={`blank-${blank}`} className="col"></div>
        ))}
        {days.map(day => (
          <div key={day} className="col">
            <button
              className={`btn btn-sm w-100 ${isSelected(day) ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => onDateChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
            >
              {day}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const AppointmentScheduler = () => {
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSchedule = () => {
    alert(`Appointment scheduled for ${date.toDateString()} by ${name} (${email})`);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">Schedule an Appointment</h5>
      </div>
      <div className="card-body">
        <Calendar selectedDate={date} onDateChange={setDate} />
        <div className="mt-3">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="form-control mb-2"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn btn-primary w-100" onClick={handleSchedule}>Schedule Appointment</button>
        </div>
      </div>
    </div>
  );
};

const PetAdoption = ({ petType }) => {
  const pets = [
    { id: 1, name: 'Fluffy', age: 2, breed: 'Persian', img: 'https://publish.purewow.net/wp-content/uploads/sites/2/2022/09/orange-cat-breeds-Maine-Coon-.jpg?fit=1360%2C800' },
    { id: 2, name: 'Buddy', age: 3, breed: 'Golden Retriever', img: 'https://heronscrossing.vet/wp-content/uploads/Golden-Retriever.jpg' },
    { id: 3, name: 'Whiskers', age: 1, breed: 'Siamese' , img: 'https://www.animalbehaviorcollege.com/wp-content/uploads/2015/03/caring-for-long-haired-cats.jpg' },
    { id: 4, name: 'Max', age: 4, breed: 'Labrador', img: 'https://www.sidewalkdog.com/wp-content/uploads/2024/03/Golden-Lab-1155x768.jpg' },
  ];

  const filteredPets = pets.filter((pet) => 
    (petType === 'Cat' && ['Persian', 'Siamese'].includes(pet.breed)) ||
    (petType === 'Dog' && ['Golden Retriever', 'Labrador'].includes(pet.breed))
  );

  return (
    <div className="row row-cols-1 row-cols-md-2 g-4">
      {filteredPets.map((pet) => (
        <div key={pet.id} className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{pet.name}</h5>
              <p className="card-text">{pet.breed}, {pet.age} years old</p>
              <img src={`${pet.img}`} alt={`${pet.name} the ${pet.breed}`} className="card-img-top mb-2" />
              <button className="btn btn-primary w-100">Adopt {pet.name}</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('scheduler');

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Pet Adoption and Appointment Scheduler</h1>
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'scheduler' ? 'active' : ''}`}
            onClick={() => setActiveTab('scheduler')}
          >
            Appointment Scheduler
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'cats' ? 'active' : ''}`}
            onClick={() => setActiveTab('cats')}
          >
            Cat Adoption
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'dogs' ? 'active' : ''}`}
            onClick={() => setActiveTab('dogs')}
          >
            Dog Adoption
          </button>
        </li>
      </ul>
      {activeTab === 'scheduler' && <AppointmentScheduler />}
      {activeTab === 'cats' && <PetAdoption petType="Cat" />}
      {activeTab === 'dogs' && <PetAdoption petType="Dog" />}
    </div>
  );
};

export default App;