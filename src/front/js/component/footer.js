import React from "react";
import "../../styles/footer.css";
import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="footer_container" id="footer_contain">
    <div className="row footer_row">
      <div className="col-4 footer_col">
        <p className="footer_infotext"> Siguenos en:</p>
        <div className="footer_social">
          <i className="fab fa-instagram fa-lg footer_iconos"></i>
          <i className="fab fa-facebook-square fa-lg footer_iconos"></i>
        </div>
      </div>
      <div className="col-4 footer_col">
        <div className="footer_infotext_container ">
          <p className="footer_infotext">Information</p>
            <Link to="/" className="footer_infosubtext">Contacto</Link><br/>
            <Link to="/" className="footer_infosubtext">Especialidades</Link><br/>
            <Link to="/" className="footer_infosubtext">Promociones</Link><br/>
            <Link to="/" className="footer_infosubtext" >Tarifas</Link><br/>
        </div>
      </div>
      <div className="col-4 footer_col  ">
        <div className="footer_infotext_container ">
          <p className="footer_infotext">Links de ayuda</p>
            <Link to="/" className="footer_infosubtext">Aviso legal</Link><br/>
            <Link to="/" className="footer_infosubtext">Politica de privacidad</Link><br/>
            <Link to="/" className="footer_infosubtext">Politica de cookies</Link><br/>
        </div>
      </div>
    </div>
  </footer>
);