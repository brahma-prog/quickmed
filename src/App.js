// import React, { useState, useEffect } from 'react';
// import HomePage from './components/HomePage';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import UserDashboard from './components/UserDashboard';
// import VendorDashboard from './components/VendorDashboard';
// import DoctorDashboard from './components/DoctorDashboard';
// import DeliveryDashboard from './components/DeliveryDashboard';

// function App() {
//   const [currentPage, setCurrentPage] = useState('home');
//   const [authMode, setAuthMode] = useState('login');
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     // Check if user is already logged in
//     const user = localStorage.getItem('currentUser');
//     if (user) {
//       const userData = JSON.parse(user);
//       setCurrentUser(userData);
//       setCurrentPage(
//         userData.userType === 'vendor' ? 'vendorDashboard' : 
//         userData.userType === 'doctor' ? 'doctorDashboard' :
//         userData.userType === 'delivery' ? 'deliveryDashboard' : 'dashboard'
//       );
//     }
//   }, []);

//   const handleLoginSuccess = (user) => {
//     setCurrentUser(user);
//     setCurrentPage(
//       user.userType === 'vendor' ? 'vendorDashboard' : 
//       user.userType === 'doctor' ? 'doctorDashboard' :
//       user.userType === 'delivery' ? 'deliveryDashboard' : 'dashboard'
//     );
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('currentUser');
//     setCurrentUser(null);
//     setCurrentPage('home');
//   };

//   const renderPage = () => {
//     switch (currentPage) {
//       case 'home':
//         return (
//           <HomePage 
//             onNavigateToAuth={() => {
//               setCurrentPage('auth');
//               setAuthMode('login');
//             }}
//           />
//         );
//       case 'auth':
//         if (authMode === 'login') {
//           return (
//             <Login 
//               onSwitchToSignup={() => setAuthMode('signup')}
//               onLoginSuccess={handleLoginSuccess}
//             />
//           );
//         } else {
//           return (
//             <Signup 
//               onSwitchToLogin={() => setAuthMode('login')}
//               onSignupSuccess={() => setAuthMode('login')}
//             />
//           );
//         }
//       case 'dashboard':
//         return (
//           <UserDashboard 
//             user={currentUser}
//             onLogout={handleLogout}
//           />
//         );
//       case 'vendorDashboard':
//         return (
//           <VendorDashboard 
//             user={currentUser}
//             onLogout={handleLogout}
//           />
//         );
//       case 'doctorDashboard':
//         return (
//           <DoctorDashboard 
//             user={currentUser}
//             onLogout={handleLogout}
//           />
//         );
//       case 'deliveryDashboard':
//         return (
//           <DeliveryDashboard 
//             user={currentUser}
//             onLogout={handleLogout}
//           />
//         );
//       default:
//         return <HomePage onNavigateToAuth={() => setCurrentPage('auth')} />;
//     }
//   };

//   return (
//     <div className="App">
//       {renderPage()}
//     </div>
//   );
// }

// export default App;

// src/App.js
import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import UserDashboard from './components/UserDashboard';
import VendorDashboard from './components/VendorDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import DeliveryDashboard from './components/DeliveryDashboard';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [authMode, setAuthMode] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      setCurrentUser(userData);
      setCurrentPage(
        userData.userType === 'vendor' ? 'vendorDashboard' : 
        userData.userType === 'doctor' ? 'doctorDashboard' :
        userData.userType === 'delivery' ? 'deliveryDashboard' :
        userData.userType === 'admin' ? 'adminDashboard' : 'dashboard'
      );
    }
  }, []);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setCurrentPage(
      user.userType === 'vendor' ? 'vendorDashboard' : 
      user.userType === 'doctor' ? 'doctorDashboard' :
      user.userType === 'delivery' ? 'deliveryDashboard' :
      user.userType === 'admin' ? 'adminDashboard' : 'dashboard'
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            onNavigateToAuth={() => {
              setCurrentPage('auth');
              setAuthMode('login');
            }}
            onNavigateToAdmin={() => {
              setCurrentPage('adminAuth');
              setAuthMode('login');
            }}
          />
        );
      case 'auth':
        if (authMode === 'login') {
          return (
            <Login 
              onSwitchToSignup={() => setAuthMode('signup')}
              onLoginSuccess={handleLoginSuccess}
            />
          );
        } else {
          return (
            <Signup 
              onSwitchToLogin={() => setAuthMode('login')}
              onSignupSuccess={() => setAuthMode('login')}
            />
          );
        }
      case 'adminAuth':
        return (
          <AdminLogin 
            onLoginSuccess={handleLoginSuccess}
            onSwitchToSignup={() => setAuthMode('signup')}
          />
        );
      case 'dashboard':
        return (
          <UserDashboard 
            user={currentUser}
            onLogout={handleLogout}
          />
        );
      case 'vendorDashboard':
        return (
          <VendorDashboard 
            user={currentUser}
            onLogout={handleLogout}
          />
        );
      case 'doctorDashboard':
        return (
          <DoctorDashboard 
            user={currentUser}
            onLogout={handleLogout}
          />
        );
      case 'deliveryDashboard':
        return (
          <DeliveryDashboard 
            user={currentUser}
            onLogout={handleLogout}
          />
        );
      case 'adminDashboard':
        return (
          <AdminDashboard 
            user={currentUser}
            onLogout={handleLogout}
          />
        );
      default:
        return <HomePage onNavigateToAuth={() => setCurrentPage('auth')} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;