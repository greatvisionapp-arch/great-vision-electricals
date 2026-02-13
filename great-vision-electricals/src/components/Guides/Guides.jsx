import React, { useState, useRef, useEffect } from "react";
import "./Guides.css";
import safety1 from "./images/safety1.png";
import safety2 from "./images/safety2.png";

const Guides = () => {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (expanded && contentRef.current) {
      setHeight(contentRef.current.scrollHeight + "px");
    } else {
      setHeight("0px");
    }
  }, [expanded]);

  return (
    <section className="guides">

      <button
        className={`guides-toggle ${expanded ? "active" : ""}`}
        onClick={() => setExpanded(!expanded)}
      >
        <span>Electrical Guides & Knowledge Center</span>
        <div className={`toggle-icon ${expanded ? "rotate" : ""}`}>▼</div>
      </button>

      <div
        ref={contentRef}
        className="guides-expand"
        style={{ maxHeight: height }}
      >
        <div className="guides-content">

          <div className="row">
            <div className="col image">
              <img src={safety1} alt="Electrical Safety" />
            </div>

            <div className="col text">
              <h2>Electrical Safety Guide</h2>

<p>
Electrical safety is critical in every installation, whether in residential,
commercial, or industrial environments. Electricity is essential for modern
living, but improper handling, poor installation, or low-quality components
can create serious hazards. Electrical accidents often occur due to faulty
wiring, damaged insulation, loose connections, and overloaded circuits.
These issues can lead to electric shock, fire, equipment failure, and even
life-threatening situations if not properly addressed.
</p>

<p>
One of the most important aspects of electrical safety is using certified
and high-quality electrical components. Substandard wires, switches, and
protection devices may fail under normal operating conditions. Certified
products are designed to handle specific voltage and current loads safely,
reducing the risk of overheating and failure. Proper installation by trained
professionals ensures secure connections and minimizes potential hazards.
</p>

<p>
Earthing, also known as grounding, plays a crucial role in electrical safety.
It provides a safe path for excess electrical current to flow into the ground,
preventing electric shock and protecting equipment from damage. Without proper
earthing, leakage current can accumulate in appliances and metal structures,
creating dangerous conditions. Every electrical system must include a properly
installed earthing system to ensure maximum safety.
</p>

<p>
Circuit protection devices such as MCB (Miniature Circuit Breaker) and RCCB
(Residual Current Circuit Breaker) are essential for preventing electrical
accidents. These devices automatically disconnect the power supply when they
detect overload, short circuit, or current leakage. This immediate response
prevents overheating, fire hazards, and equipment damage. Proper selection
and installation of protection devices significantly improve overall system
safety and reliability.
</p>

<p>
Regular inspection and maintenance are also necessary to ensure long-term
electrical safety. Over time, wires may degrade, insulation may weaken,
and connections may loosen due to environmental factors and usage. Periodic
inspection helps identify these issues early, allowing timely repairs before
they become serious hazards. Preventive maintenance not only improves safety
but also increases the lifespan and efficiency of the electrical system.
</p>

<p>
Following proper electrical safety practices protects both people and property.
Using quality materials, ensuring correct installation, maintaining proper
earthing, and installing reliable protection devices are essential steps for
creating a safe and dependable electrical system. A well-designed and properly
maintained electrical system ensures reliable performance, minimizes risks,
and provides long-term safety and peace of mind.
</p>

            </div>
          </div>

          <div className="row">
            <div className="col text">
              <p>
Proper earthing, also known as grounding, provides a safe and controlled path
for excess electrical current to flow into the ground. This is one of the most
critical safety features in any electrical system. When a fault occurs, such as
insulation failure or leakage current, earthing prevents the electrical energy
from passing through a person or damaging connected equipment. Without proper
earthing, metal surfaces of appliances and panels can become electrically live,
creating a serious risk of electric shock and injury. A properly installed
earthing system ensures that fault current is safely discharged, protecting
both people and infrastructure.
</p>

<p>
Earthing also plays a vital role in stabilizing voltage levels within the
electrical system. It helps maintain consistent voltage and prevents sudden
fluctuations that can damage sensitive electronic devices such as computers,
televisions, and control equipment. Electrical systems without proper grounding
are more vulnerable to voltage instability, which can reduce equipment lifespan
and lead to costly repairs. Reliable earthing improves overall system stability,
performance, and operational safety.
</p>

<p>
Proper earthing requires high-quality conductors, secure connections, and
correct installation methods. Copper earthing conductors are commonly used
because of their excellent conductivity and corrosion resistance. The earthing
electrode must be properly installed in the ground to ensure effective current
dissipation. Loose or corroded earthing connections reduce effectiveness and
can compromise safety. Professional installation ensures compliance with
electrical safety standards and guarantees reliable performance.
</p>

<p>
Regular inspection and maintenance are equally important for ensuring electrical
safety. Over time, electrical wiring can deteriorate due to environmental
conditions, heat, moisture, and mechanical stress. Damaged insulation, loose
connections, and worn-out components can increase resistance, leading to
overheating and potential fire hazards. Routine inspection helps identify
these issues early, allowing corrective action before serious problems occur.
</p>

<p>
Inspection should include checking wiring insulation, connection tightness,
earthing continuity, and protection devices such as MCB and RCCB. Signs such as
burn marks, unusual heat, flickering lights, or frequent circuit breaker trips
may indicate underlying electrical problems. Early detection and repair prevent
equipment damage, reduce downtime, and improve overall system reliability.
Preventive maintenance is far more cost-effective than repairing major failures
caused by neglected electrical faults.
</p>

<p>
Implementing proper earthing and regular inspection practices ensures a safe,
stable, and reliable electrical system. These measures protect users from
electric shock, prevent equipment damage, and reduce fire risks. A well-grounded
and properly maintained electrical installation provides long-term safety,
improves performance, and ensures dependable operation in residential,
commercial, and industrial environments.
</p>

            </div>

            <div className="col image">
              <img src={safety2} alt="Earthing" />
            </div>
          </div>
          <div className="row">
            <div className="col image">
              <img src={safety1} alt="Electrical Safety" />
            </div>

            <div className="col text">

<p>
<h2>Electrical Safety Gear Guide</h2>

Electrical safety gear is essential for protecting individuals who work with or
around electrical systems. Electricity can cause severe injuries including
electric shock, burns, arc flash injuries, and even fatal accidents if proper
protective measures are not followed. Safety gear acts as a protective barrier
between the human body and electrical hazards, reducing the risk of injury and
ensuring safe working conditions. Whether performing installation, maintenance,
or inspection, using appropriate safety equipment is a fundamental requirement
in all electrical environments.
</p>

<p>
One of the most important electrical safety tools is insulated gloves. These
gloves are designed to prevent electrical current from passing through the body.
They are made from specialized insulating materials that can withstand high
voltage levels. Insulated gloves must be regularly inspected for cracks, damage,
or wear, as compromised gloves can fail to provide adequate protection. Wearing
high-quality insulated gloves significantly reduces the risk of electric shock
during electrical work.
</p>

<p>
Insulated tools are also critical for safe electrical operations. Tools such as
screwdrivers, pliers, and cutters with insulated handles prevent accidental
contact between live conductors and the user. These tools are specifically
designed to protect electricians from electrical current while performing tasks
such as wiring, repairs, and installations. Using standard tools without
insulation increases the risk of electrical accidents and should always be
avoided in electrical work environments.
</p>

<p>
Protective footwear, such as electrical safety shoes, provides additional
protection by preventing electrical current from passing through the feet.
These shoes are made with insulating soles that reduce the risk of grounding
through the body. Safety shoes also protect against physical hazards such as
falling tools, sharp objects, and slippery surfaces, ensuring overall workplace
safety. Proper footwear is essential for anyone working in electrical
installations or maintenance environments.
</p>

<p>
Personal protective equipment such as safety helmets, face shields, and safety
glasses protect against arc flash, sparks, and flying debris. Arc flash incidents
can generate extreme heat and light, causing serious burns and eye injuries.
Protective helmets and face shields provide essential protection in high-risk
electrical environments. Wearing appropriate protective gear significantly
reduces injury risk and ensures safe working conditions.
</p>

<p>
Using proper electrical safety gear is not optional but a necessary requirement
for safe electrical work. High-quality protective equipment, regular inspection,
and proper usage ensure maximum safety. Electrical safety gear protects workers,
prevents injuries, and ensures compliance with safety standards. Investing in
proper safety equipment improves safety, reliability, and confidence while
working with electrical systems.
</p>


            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Guides;
