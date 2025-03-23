export default function AboutSection() {
  return (
    <section id="about" className="w-full py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-sm">
            <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
              ABOUT ME
            </span>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Automation <span className="text-blue-600">Specialist</span>
        </h2>

        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8">
          I help businesses identify and implement automation opportunities that save time, reduce errors, and improve
          overall efficiency.
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-600 mb-4">
              With over 5 years of experience in business process automation, I've helped companies of all sizes
              transform their operations through strategic implementation of no-code and low-code solutions.
            </p>
            <p className="text-gray-600 mb-4">
              My approach combines technical expertise with a deep understanding of business processes, allowing me to
              identify the most impactful automation opportunities and implement solutions that deliver measurable
              results.
            </p>
            <p className="text-gray-600">
              Whether you're looking to streamline a specific workflow or transform your entire operation, I can help
              you navigate the automation landscape and build solutions that scale with your business.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg p-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="text-xl font-bold text-blue-600 mb-2">50+</h3>
                <p className="text-gray-600">Projects Completed</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="text-xl font-bold text-blue-600 mb-2">30+</h3>
                <p className="text-gray-600">Happy Clients</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="text-xl font-bold text-blue-600 mb-2">5+</h3>
                <p className="text-gray-600">Years Experience</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="text-xl font-bold text-blue-600 mb-2">10+</h3>
                <p className="text-gray-600">Tools Mastered</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

