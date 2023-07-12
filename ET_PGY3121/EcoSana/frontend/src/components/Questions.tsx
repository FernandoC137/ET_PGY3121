import styles from "../style";

const Questions = ({ darkMode }: { darkMode: boolean }) =>  {
    return (
      <section
        id="questions"
        className="mt-0 3xs:mt-0 2xs:mt-0 xs:mt-0 sm:mt-0 md:mt-8 lg:mt-8 xl:mt-8 2xl:mt-8 3xl:mt-10 mb-36"
      >
        <div
          className={`p-6 md:p-8 lg:p-10 ${styles.flexCenter}`}
        >
          <div
            className={`${styles.heading2A} flex flex-col items-center mt-8 mb-4 p-6`}
          >
            <div
              className={`flex flex-row bg-green-200 items-center py-[6px] px-4 rounded-[20px] mb-6 font-poppins`}
            >
              <span className={`text-green-500 font-bold text-xs uppercase`}>
                FAQ
              </span>
            </div>
            <div>
              <h1 className={`text-center text-neutral-700 ${darkMode ? "dark" : ""} `}>Preguntas Frecuentes</h1>
            </div>
            <div className="mt-2 mb-16">
              <h2 className={`text-center mt-4 ${styles.heading2D}`}>
                Algunas de las dudas mas frecuentes y sus respuestas en esta seccion de utilidad para
                <br></br>
                nuestros clientes y afiliados.
              </h2>
            </div>
            <div className="mt-12">
              <div
                className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative z-[1] 3xs:text-left text-center`}
              >
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  <div
                    className={`shadow-xl p-10 rounded-2xl w-full ${darkMode ? 'dark-card' : ''} `}
                  >
                    <div className="h-[100px] hero-text-gradient text-[42px] -mb-4">
                      1
                    </div>
                    <div className={`${styles.heading1E} ${darkMode ? "dark-card" : ""} h-[100px] mb-8`}>
                    Son una ONG o una Pyme comunitaria?
                    </div>
                    <div
                      className={`${styles.paragraph1D} h-[200px]`}
                    >
                     Somos una ONG que presta servicios comunitarios.
                    </div>
                  </div>
                  <div
                    className={`shadow-xl p-10 rounded-2xl w-full ${darkMode ? 'dark-card' : ''} `}
                  >
                    <div className="h-[100px] hero-text-gradient text-[42px] -mb-4">
                      2
                    </div>
                    <div className={`${styles.heading1E} ${darkMode ? "dark-card" : ""} h-[100px] mb-8`}>
                    Que ofrecen?
                    </div>
                    <div
                      className={`${styles.paragraph1D} h-[200px]`}
                    >
                      Productos o servicio de jardineria y relacionados a ello.
                    </div>
                  </div>
                  <div
                    className={`shadow-xl p-10 rounded-2xl w-full ${darkMode ? 'dark-card' : ''}`}
                  >
                    <div className="h-[100px] hero-text-gradient text-[42px] -mb-4">
                      3
                    </div>
                    <div className={`${styles.heading1E} ${darkMode ? "dark-card" : ""} mb-8 h-[100px]`}>
                    Donde puedo contactarlos?
                    </div>
                    <div
                      className={`${styles.paragraph1D} h-[200px]`}
                    >
                      Por nuestras redes, o por nuestro formulario de contacto.
                    </div>
                  </div>
                  <div
                    className={`shadow-xl p-10 rounded-2xl w-full ${darkMode ? 'dark-card' : ''} `}
                  >
                    <div className="h-[100px] hero-text-gradient text-[42px] -mb-4">
                      4
                    </div>
                    <div className={`${styles.heading1E} ${darkMode ? "dark-card" : ""} h-[100px] mb-8`}>
                    Tienen atencion para empresas?
                    </div>
                    <div
                      className={`${styles.paragraph1D}  h-[200px]`}
                    >
                      Si, En EcoSana contamos con atencion para empresas.
                    </div>
                  </div>
                  <div
                    className={`shadow-xl p-10 rounded-2xl w-full ${darkMode ? 'dark-card' : ''} `}
                  >
                    <div className="h-[100px] hero-text-gradient text-[42px] -mb-4">
                      5
                    </div>
                    <div className={`${styles.heading1E} ${darkMode ? "dark-card" : ""} h-[100px] mb-8`}>
                    Como puedo aportar?
                    </div>
                    <div
                      className={`${styles.paragraph1D} h-[200px]`}
                    >
                      Presencialmente en las sucursales de EcoSana.
                    </div>
                  </div>
                  <div
                    className={`shadow-xl p-10 rounded-2xl w-full ${darkMode ? 'dark-card' : ''} `}
                  >
                    <div className="h-[100px] hero-text-gradient text-[42px] -mb-4">
                      6
                    </div>
                    <div className={`${styles.heading1E} ${darkMode ? "dark-card" : ""} h-[100px] mb-8`}>
                    Para que se destinan mis aportes?
                    </div>
                    <div
                      className={`${styles.paragraph1D} h-[200px]`}
                    >
                    Para fines ecologicos, tales como reforestacion, entre otros.
                    </div>
                  </div>
                  <div
                    className={`shadow-xl p-10 rounded-2xl w-full ${darkMode ? 'dark-card' : ''} `}
                  >
                    <div className="h-[100px] hero-text-gradient text-[42px] -mb-4">
                      7
                    </div>
                    <div className={`${styles.heading1E} ${darkMode ? "dark-card" : ""} h-[100px] mb-8`}>
                    Donde puedo recibir soporte?
                    </div>
                    <div
                      className={`${styles.paragraph1D} h-[200px]`}
                    >
                    En nuestro Centro de Ayuda, puedes acceder a el en el pie de pagina.
                    </div>
                  </div>
                  <div
                    className={`shadow-xl p-10 rounded-2xl w-full ${darkMode ? 'dark-card' : ''}`}
                  >
                    <div className="h-[100px] hero-text-gradient text-[42px] -mb-4">
                      8
                    </div>
                    <div className={`${styles.heading1E} ${darkMode ? "dark-card" : ""} h-[100px] mb-8`}>
                    Si soy empresa, puedo auspiciarlos?
                    </div>
                    <div
                      className={`${styles.paragraph1D} h-[200px]`}
                    >
                    Por supuesto!. Cualquier empresa, puede ser un EcoSponsor.
                    </div>
                  </div>
                  <div
                    className={`shadow-xl p-10 rounded-2xl w-full  ${darkMode ? 'dark-card' : ''} `}
                  >
                    <div className="h-[100px] hero-text-gradient text-[42px] -mb-4">
                      9
                    </div>
                    <div className={`${styles.heading1E} ${darkMode ? "dark-card" : ""} h-[100px] mb-8`}>
                    Puedo trabajar en EcoSana?
                    </div>
                    <div
                      className={`${styles.paragraph1D} h-[200px]`}
                    >
                    Si. en el pie de pagina puedes acceder al formulario para las vacantes.
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

export default Questions