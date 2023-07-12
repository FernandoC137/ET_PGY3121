import styles from "../style";

const Roadmap = () => {
  return (
    <section
      id="roadmap"
      className="mt-0 3xs:mt-0 2xs:mt-0 xs:mt-0 sm:mt-0 md:mt-8 lg:mt-8 xl:mt-8 2xl:mt-8 3xl:mt-10 mb-36"
    >
      <div
        className={`bg-gray-700 rounded-3xl p-6 md:p-8 lg:p-10 ${styles.flexCenter}`}
      >
        <div
          className={`${styles.heading2A} flex flex-col items-center mt-8 mb-4 p-6`}
        >
          <div
            className={`flex flex-row bg-green-200 items-center py-[6px] px-4 rounded-[20px] mb-6 font-poppins`}
          >
            <span className={`text-green-500 font-bold text-xs uppercase`}>
              Roadmap
            </span>
          </div>
          <div>
            <h1 className="text-center">Roadmap de EcoSana</h1>
          </div>
          <div className="mt-2">
            <h2 className={`text-center mt-4 ${styles.heading2D}`}>
              Un poco acerca de nuestro recorrido como organizacion con mirada a
              transformarnos en
              <br></br>
              una empresa exponente en el rubro
            </h2>
          </div>
          <div className="mt-12">
            <div
              className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative z-[1] 3xs:text-left text-center`}
            >
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div
                  className={`shadow-xl p-10 rounded-2xl w-full bg-slate-600`}
                >
                  <div className="h-[100px] hero-text-gradient text-[42px] -mb-4">
                    1
                  </div>
                  <div className={`${styles.heading1E} text-white mb-8`}>
                    Fundación de EcoSana
                  </div>
                  <div
                    className={`${styles.paragraph1D} text-neutral-300 h-[270px]`}
                  >
                    EcoSana fija sus bases y valores fundamentales. Su enfoque
                    es en promover el interes por la jardineria
                  </div>
                </div>
                <div
                  className={`shadow-xl p-10 rounded-2xl w-full bg-slate-600`}
                >
                  <div className="h-[100px] hero-text-gradient text-[42px] -mb-4">
                    2
                  </div>
                  <div className={`${styles.heading1E} text-white mb-8`}>
                    Innovación y Desarrollo de Productos
                  </div>
                  <div
                    className={`${styles.paragraph1D} text-neutral-300 h-[270px]`}
                  >
                    El staff de expertos trabajo ardumente para crear soluciones
                    eco-amigables de calidad.
                  </div>
                </div>
                <div
                  className={`shadow-xl p-10 rounded-2xl w-full bg-slate-600`}
                >
                  <div className="h-[100px] hero-text-gradient text-[42px] -mb-4">
                    3
                  </div>
                  <div className={`${styles.heading1E} text-white mb-8`}>
                    Expansión de Servicios y Educación
                  </div>
                  <div
                    className={`${styles.paragraph1D} text-neutral-300 h-[270px]`}
                  >
                    Además de proporcionar productos de calidad, se comienzan a
                    prestar servicios de jardineria , entre otros.
                  </div>
                </div>
                <div
                  className={`shadow-xl p-10 rounded-2xl w-full bg-slate-600`}
                >
                  <div className="h-[100px] hero-text-gradient text-[42px] -mb-4">
                    4
                  </div>
                  <div className={`${styles.heading1E} text-white mb-8`}>
                    Alianzas Estratégicas
                  </div>
                  <div
                    className={`${styles.paragraph1D} text-neutral-300 h-[270px]`}
                  >
                    Inicio de alianzas con ONGs afines y expertos en el rubro
                    para fortalecer nuestra presencia
                  </div>
                </div>
                <div
                  className={`shadow-xl p-10 rounded-2xl w-full bg-slate-600`}
                >
                  <div className="h-[100px] hero-text-gradient text-[42px] -mb-4">
                    5
                  </div>
                  <div className={`${styles.heading1E} text-white mb-8`}>
                    Expansión Nacional e Internacional
                  </div>
                  <div
                    className={`${styles.paragraph1D} text-neutral-300 h-[270px]`}
                  >
                    Nuestra meta es convertirnos en una empresa exponente a
                    nivel global, llegando a todos lados
                  </div>
                </div>
                <div
                  className={`shadow-xl p-10 rounded-2xl w-full bg-slate-600`}
                >
                  <div className="h-[100px] hero-text-gradient text-[42px] -mb-4">
                    6
                  </div>
                  <div className={`${styles.heading1E} text-white mb-8`}>
                    Liderazgo e Influencia en la Industria
                  </div>
                  <div
                    className={`${styles.paragraph1D} text-neutral-300 h-[270px]`}
                  >
                    EcoSana aspira a consolidarse como un líder influyente en el
                    rubro, elevando los estandares actuales.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
