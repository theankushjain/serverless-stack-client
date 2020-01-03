import React from "react";
import "./Home.css";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function Home() {
  return (
    <div className="Home">
      <div className="lander">
        <h1>Where do you want to go?</h1>
        <Link to="/swagger">
            <Button variant="primary" size="lg" block >
                Swagger Documentation
            </Button>
        </Link>
      </div>
    </div>
  );
}