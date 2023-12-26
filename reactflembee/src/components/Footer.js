import './Footer.css'

const CompFooter = () => {
    const year = new Date().getFullYear(); // Obtener el año actual

    return (
        <footer className="footerStyle" style={{}}>
            <p>© {year} RecipeApp. Todos los derechos reservados.</p>
        </footer>
    );
}

export default CompFooter;