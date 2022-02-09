import "../style/schedular.css"
import Navbar from "../components/Navbar";

const Schedular = () => {
    return(
        <>
            <Navbar />
            <div className="frame">
                <div className="calender">
                    <div style={{height: "100%", backgroundColor: "red"}}></div>
                </div>
                <div className="selection">
                    <div className="box" style={{height: "100%", width:"45%", backgroundColor: "red"}}></div>
                    <div className="box" style={{height: "100%", width:"45%", backgroundColor: "red"}}></div>
                </div>
            </div>
        </>
    );
}

export default Schedular;