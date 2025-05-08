from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI
from dotenv import load_dotenv

from langchain_core.runnables import RunnableLambda

load_dotenv()

template = "다음 문장을 한국어로 번역해줘: \n\n {sentence}"
prompt = PromptTemplate(input_variables=["sentence"], template=template)
llm = OpenAI(temperature=1.0,
             max_tokens=1024,
             )

chain = prompt | llm | RunnableLambda(lambda x: {'translated': x.strip()})

result = chain.invoke({'sentence':
                        """
Astronomy of the universe, or extragalactic astronomy and cosmology, is the scientific study of celestial objects and phenomena beyond Earth. It encompasses the observation and analysis of stars, planets, comets, galaxies, black holes, neutron stars, and the cosmic microwave background (CMB). To overcome the limitations of ground-based telescopes, space telescopes such as the Hubble Space Telescope and the James Webb Space Telescope have been developed, enabling high-resolution observations of distant galaxies and the early universe without interference from the Earth's atmosphere.
Modern astrophysics is divided by the wavelengths of light used for observation. Optical astronomy focuses on the visible spectrum, while infrared astronomy reveals cooler objects emitting thermal radiation. X-ray and gamma-ray astronomy study extreme, high-energy environments like black holes and supernovae. Each wavelength provides a different perspective of the universe, and combining them allows for a more complete understanding of cosmic phenomena.
Gravitational wave astronomy emerged in 2015 when LIGO first detected gravitational waves—ripples in spacetime caused by the collision of massive objects like black holes or neutron stars. This opened a new window into parts of the universe that light cannot reach.
Additionally, the cosmic microwave background (CMB) is a faint glow left over from the Big Bang, offering a snapshot of the early universe. Its analysis provides crucial data about the age of the universe (approximately 13.7 billion years), its density, and its composition, including dark matter and dark energy.
Astronomy of the universe is inherently interdisciplinary, combining physics, mathematics, computer science, and engineering. It plays a fundamental role in helping humanity explore the origins, structure, evolution, and ultimate fate of the cosmos.
                        """})

print('한글번역본: ', result['translated'])