import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CompShowUsers from './Users/ShowUsers.js';
import CompCreateUser from './Users/CreateUser.js';
import CompEditUsers from './Users/EditUsers.js';
import CompShowRecipes from './Recipes/ShowRecipes.js';
import CompCreateRecipes from './Recipes/CreateRecipes.js';
import CompEditRecipes from './Recipes/EditRecipes.js';
import CompShowDashboard from './Dashboard/ShowDashboard.js';
import CompShowRecipeDetails from './Recipes/CompShowRecipeDetails.js';
import CompShowPersonalRecipes from './Users/PersonalRecipes.js';
import CompShowLogin from './Login/ShowLogin.js';
import CompNavbar from './components/Navbar.js';
import CompShowSignup from './Login/ShowSignup.js';
import CompFooter from './components/Footer.js'
import { AuthProvider } from './AuthContext/AuthContext.js';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
        <CompNavbar/>
          <Routes>
            {/* LOGIN */}
            <Route path='/' element={<CompShowLogin/>}/>
            <Route path='/signup' element={<CompShowSignup/>}/>
            {/* MENU PRINCIPAL */}
            <Route path='/dashboard' element={<CompShowDashboard/>}/>
            {/* RUTAS DE RECETAS */}
            <Route path='/recipes' element={<CompShowRecipes/>}/>
            <Route path='/recipes/create' element={<CompCreateRecipes/>}/>
            <Route path='/recipes/edit/:id' element={<CompEditRecipes/>}/>
            <Route path='/recipe/:id' element={<CompShowRecipeDetails/>}/>
            {/* RUTAS DE USUARIOS */}
            <Route path='/users' element={<CompShowUsers/>}/>
            <Route path='/users/create' element={<CompCreateUser/>}/>
            <Route path='/users/edit/:id' element={<CompEditUsers/>}/>
            <Route path='/users/:id' element={<CompShowPersonalRecipes/>}/>
          </Routes>
          <CompFooter/>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
