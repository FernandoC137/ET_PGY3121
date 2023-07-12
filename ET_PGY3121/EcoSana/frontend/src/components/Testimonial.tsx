import styles from "../style";

const Testimonial = ({ darkMode }: { darkMode: boolean }) => (
  <section
    id="testimonial-home"
    className={`flex md:flex-row flex-col md:mb-24 lg:mb-24 xl:mb-24 2xl:mb-24 3xl:mb-24 mb-24 mt-16 ${styles.paddingY} ${darkMode ? 'dark' : ''}`}
  >
    <div
      className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 mb-4`}
    >
      <div className="flex flex-row bg-green-200 items-center py-[6px] px-4 rounded-[20px] mb-8 font-poppins">
        <span className="text-xs font-bold text-green-500 uppercase">
          Testimonios
        </span>
      </div>
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className={`${styles.heading1D} ${darkMode ? 'dark' : ''}`}>
          Testimonios de nuestros usuarios
          <div className="mt-6">
            <h2 className={`${styles.heading2C} ${darkMode ? 'dark' : ''}`}>
              Algunas experiencias de quienes han confiado en nosotros
            </h2>
          </div>
        </h1>
      </div>
      <div className="mt-12">
        <div
          className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative z-[1]`}
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className={`shadow-xl p-10 rounded-2xl w-full ${darkMode ? 'dark-card' : ''}`}>
              <div className={`${styles.paragraph1D} h-[300px]`}>
                Desde que me convertí en usuaria de Ecosana, mi jardín ha florecido como nunca antes.
              </div>
              <div className="">
                <div className={`${styles.heading1F} ${darkMode ? 'dark-card' : ''}`}>
                  Laura H.
                </div>
                <div className={`${styles.paragraph1C} mt-1 ${darkMode ? 'dark-card' : ''}`}>
                  Miembro de la comunidad
                </div>
              </div>
            </div>
            <div className={`shadow-xl p-10 rounded-2xl w-full ${darkMode ? 'dark-card' : ''}`}>
              <div className={`${styles.paragraph1D} h-[300px]`}>
                Como cliente fiel de Ecosana, puedo decir que su compromiso con la comunidad es admirable.
              </div>
              <div className="">
                <div className={`${styles.heading1F} ${darkMode ? 'dark-card' : ''}`}>
                  Carlos G.
                </div>
                <div className={`${styles.paragraph1C} mt-1 ${darkMode ? 'dark-card' : ''}`}>
                  Cliente Verificado
                </div>
              </div>
            </div>
            <div className={`shadow-xl p-10 rounded-2xl w-full ${darkMode ? 'dark-card' : ''}`}>
              <div className={`${styles.paragraph1D} h-[300px]`}>
                Gracias a EcoSana, he podido transformar mi pequeño balcón en un oasis verde.
              </div>
              <div>
                <div className={`${styles.heading1F} ${darkMode ? 'dark-card' : ''}`}>
                  Anais R.
                </div>
                <div className={`${styles.paragraph1C} mt-1 ${darkMode ? 'dark-card' : ''}`}>
                  Miembro de la comunidad
                </div>
              </div>
            </div>
            <div className={`shadow-xl p-10 rounded-2xl w-full ${darkMode ? 'dark-card' : ''}`}>
              <div className={`${styles.paragraph1D} h-[300px]`}>
                Ser cliente de Ecosana ha sido una experiencia muy gratificante.
              </div>
              <div className="">
                <div className={`${styles.heading1F} ${darkMode ? 'dark-card' : ''}`}>
                  Juan T.
                </div>
                <div className={`${styles.paragraph1C} mt-1 ${darkMode ? 'dark-card' : ''}`}>
                  Cliente Verificado
                </div>
              </div>
            </div>
            <div className={`shadow-xl p-10 rounded-2xl w-full ${darkMode ? 'dark-card' : ''}`}>
              <div className={`${styles.paragraph1D} h-[300px]`}>
                Valoro la gran dedicación al proporcionar productos de jardinería de calidad a precios bajos.
              </div>
              <div className="">
                <div className={`${styles.heading1F} ${darkMode ? 'dark-card' : ''}`}>
                  Sandra M.
                </div>
                <div className={`${styles.paragraph1C} mt-1 ${darkMode ? 'dark-card' : ''}`}>
                  Cliente Verificado
                </div>
              </div>
            </div>
            <div className={`shadow-xl p-10 rounded-2xl w-full ${darkMode ? 'dark-card' : ''}`}>
              <div className={`${styles.paragraph1D} h-[300px]`}>
                Su pasión por la jardinería se refleja en la excelencia de sus productos.
              </div>
              <div className="">
                <div className={`${styles.heading1F} ${darkMode ? 'dark-card' : ''}`}>
                  Agatha F.
                </div>
                <div className={`${styles.paragraph1C} mt-1 ${darkMode ? 'dark-card' : ''}`}>
                  Cliente Verificado
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Testimonial;
