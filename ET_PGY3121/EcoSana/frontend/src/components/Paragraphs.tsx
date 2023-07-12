import styles from "../style";

const Paragraphs = ({ darkMode }: { darkMode: boolean }) => (
  <section
    id="paragraphs-home"
    className={`flex md:flex-row flex-col md:mb-24 lg:mb-24 xl:mb-24 2xl:mb-24 3xl:mb-24 mb-0 mt-12 ${styles.paddingY} ${darkMode ? "dark" : ""}`}
  >
    <div
      className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 mb-4`}
    >
      <div className={`flex flex-row bg-green-200 items-center py-[6px] px-4 rounded-[20px] mb-6 font-poppins`}>
        <span className={`text-green-500 font-bold text-xs uppercase`}>
          Rubro
        </span>
      </div>
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className={`${styles.heading1D} ${darkMode ? "dark" : ""}`}>
          El mundo de las plantas:
          <br></br>
          El verde núcleo de EcoSana
          <div className="mt-6">
            <h2 className={`${styles.heading2C} ${darkMode ? "dark" : ""}`}>
              El fascinante mundo de las plantas, lo que mueve a nuestra
              organización
            </h2>
            <div className={`${styles.paragraph1A} mt-8 `}>
              <div>
                <p>
                  Las plantas son seres vivos fascinantes que desempeñan un
                  papel vital en nuestro ecosistema. A través del proceso de
                  fotosíntesis, las plantas son capaces de convertir la energía
                  solar en nutrientes que necesitan para crecer y sobrevivir.
                  Utilizando la clorofila presente en sus hojas, las plantas
                  capturan la luz del sol y la combinan con dióxido de carbono y
                  agua para producir glucosa y oxígeno. Este proceso no solo les
                  proporciona la energía necesaria, sino que también es
                  fundamental para mantener el equilibrio de gases en nuestra
                  atmósfera.
                </p>
              </div>
              <div className="mt-4">
                <p>
                  Además de su función en la producción de oxígeno, las plantas
                  desempeñan otros roles esenciales en el ecosistema.
                </p>
              </div>
            </div>
          </div>
        </h1>
      </div>
    </div>
    <div className="p-0 3xs:p-4 2xs:p-4 xs:p-4 sm:p-2 md:p-0 lg:p-2 xl:p-6 2xl:p-6 3xl:p-6"></div>
    <div
      className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 mb-4`}
    >
      <div className={`${styles.paragraph1A}`}>
        <div>
          <p>
            Actúan como filtros naturales, purificando el aire al absorber
            contaminantes y partículas nocivas. También juegan un papel crucial
            en la conservación del suelo, ya que sus raíces evitan la erosión al
            sujetar y estabilizar el terreno. Asimismo, las plantas proporcionan
            refugio y alimento para diversas especies animales, contribuyendo a
            la biodiversidad.
          </p>
        </div>
        <div className="mt-4">
          <p>
            Cuidar y cultivar plantas es una forma maravillosa de conectarnos
            con la naturaleza y cuidar nuestro entorno, creando espacios verdes
            donde podemos relajarnos y encontrar paz.
          </p>
        </div>
        <div>
          <p>
            En resumen, las plantas son organismos fundamentales en la Tierra.
            Su capacidad de realizar la fotosíntesis y su interacción con el
            entorno las convierten en pilares de los ecosistemas, al
            proporcionar oxígeno, purificar el aire, conservar el suelo y
            sostener la vida de numerosas especies. Cuidar y valorar las plantas
            es crucial para mantener el equilibrio y la salud de nuestro
            planeta.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Paragraphs;
