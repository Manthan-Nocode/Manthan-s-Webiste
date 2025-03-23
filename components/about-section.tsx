import Image from "next/image"
import { ArrowRight, Lightbulb, BarChartHorizontal, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutSection() {
  return (
    <section className="w-full py-20 px-4 bg-white" id="about">
      <div className="container mx-auto max-w-5xl">
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center justify-center px-[15px] py-[5px] rounded-[20px] bg-[#E8F0FE] border border-[#E8F0FE]">
            <span className="text-[12px] font-medium text-[#4169E1] tracking-[0.03em]">ABOUT ME</span>
          </div>
        </div>

        <h2 className="text-[36px] font-bold mb-4 text-center tracking-[-0.01em] leading-[1.3]">
          Who I <span className="text-[#4169E1]">Am</span>
        </h2>

        <p className="text-center text-[#333333] text-[16px] max-w-[650px] mx-auto mb-10 leading-[1.5]">
          I'm a strategic advisor with over 8 years of experience helping businesses leverage AI and automation to solve
          complex challenges and drive growth.
        </p>

        <div className="grid md:grid-cols-12 gap-[4%] mb-8">
          {/* Left Column - 38% */}
          <div className="md:col-span-5">
            <div className="bg-white rounded-[12px] shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-[#F0F0F0] overflow-hidden">
              <div className="bg-gradient-to-br from-[#87CEFA] to-[#9370DB] h-[240px] shadow-[0px_4px_15px_rgba(0,0,0,0.08)]">
                <div className="w-full h-full flex items-center justify-center relative">
                  <Image
                    src="/placeholder.svg?height=200&width=300"
                    alt="Profile"
                    width={300}
                    height={200}
                    className="opacity-30 object-cover"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </div>
              </div>

              <div className="p-[24px]">
                <h3 className="text-[22px] font-[700] text-[#333333] mb-4 leading-[1.3] tracking-[-0.01em]">
                  My Approach
                </h3>
                <p className="text-[14px] font-[400] text-[#555555] mb-4 leading-[1.6]">
                  I believe in bridging the gap between cutting-edge technology and practical business applications. My
                  unique background in both technical development and business strategy allows me to translate complex
                  AI concepts into tangible business value.
                </p>
                <p className="text-[14px] font-[400] text-[#555555] mb-6 leading-[1.6]">
                  Whether you're looking to optimize existing processes or create entirely new business models powered
                  by AI, I provide the strategic guidance and implementation expertise to make it happen.
                </p>

                <Button className="w-full bg-[#4169E1] hover:bg-[#3563E9] hover:shadow-[0px_6px_15px_rgba(65,105,225,0.2)] text-white py-[12px] px-[20px] rounded-[8px] text-[14px] flex items-center justify-center">
                  Download Resume <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - 58% */}
          <div className="md:col-span-7">
            <div className="bg-white rounded-[12px] p-[20px] shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-[#F0F0F0]">
              <h3 className="text-[20px] font-[700] text-[#333333] mb-[20px] leading-[1.3] tracking-[-0.01em]">
                Professional Experience
              </h3>

              <div className="space-y-[20px] mb-6">
                <div className="flex gap-[12px]">
                  <div className="bg-[#4169E1] p-[10px] rounded-[8px] h-[40px] w-[40px] flex items-center justify-center">
                    <Lightbulb className="h-[20px] w-[20px] text-white" />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-[600] text-[#333333]">Business Analyst (PM)</h4>
                    <p className="text-[14px] font-[600] text-[#4169E1]">Alter Domus ・ Jan 2024 - Present</p>
                    <p className="text-[14px] font-[400] text-[#555555]">
                      Designed and implemented hybrid AI document intelligence systems, reducing operational costs by
                      19-22%.
                    </p>
                  </div>
                </div>

                <div className="flex gap-[12px]">
                  <div className="bg-[#8A70D6] p-[10px] rounded-[8px] h-[40px] w-[40px] flex items-center justify-center">
                    <BarChartHorizontal className="h-[20px] w-[20px] text-white" />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-[600] text-[#333333]">Founder, Product Strategist & Growth</h4>
                    <p className="text-[14px] font-[600] text-[#4169E1]">Just Humans ・ Dec 2022 - Jul 2023</p>
                    <p className="text-[14px] font-[400] text-[#555555]">
                      Integrated intelligent automation tools for dynamic dashboards, reducing page abandonment and
                      optimizing workflow efficiency.
                    </p>
                  </div>
                </div>

                <div className="flex gap-[12px]">
                  <div className="bg-[#9370DB] p-[10px] rounded-[8px] h-[40px] w-[40px] flex items-center justify-center">
                    <BarChart2 className="h-[20px] w-[20px] text-white" />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-[600] text-[#333333]">Web3 Project Manager & Growth Strategist</h4>
                    <p className="text-[14px] font-[600] text-[#4169E1]">
                      Independent Consultant ・ Jan 2022 - Oct 2022
                    </p>
                    <p className="text-[14px] font-[400] text-[#555555]">
                      Managed blockchain projects using Agile methodologies, increasing NFT minting rates by 15% through
                      strategic project management.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-[20px] font-[700] text-[#333333] mb-4">Education</h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="bg-[#E8F0FE] p-2 rounded-full h-10 w-10 flex items-center justify-center">
                        <svg
                          className="h-5 w-5 text-[#4169E1]"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 4L3 9L12 14L21 9L12 4Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3 9V18L12 23L21 18V9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-[16px] font-[600] text-[#333333]">Masters in Management Strategy</h4>
                        <p className="text-[14px] font-[400] text-[#555555]">Dublin City University, June 2024</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="bg-[#E8F0FE] p-2 rounded-full h-10 w-10 flex items-center justify-center">
                        <svg
                          className="h-5 w-5 text-[#4169E1]"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 4L3 9L12 14L21 9L12 4Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3 9V18L12 23L21 18V9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-[16px] font-[600] text-[#333333]">Bachelor in Computer Science</h4>
                        <p className="text-[14px] font-[400] text-[#555555]">
                          Thakur College of Science and Commerce, March 2019
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[20px] font-[700] text-[#333333] mb-4">Achievements</h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="bg-[#E8F0FE] p-2 rounded-full h-10 w-10 flex items-center justify-center">
                        <svg
                          className="h-5 w-5 text-[#4169E1]"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-[16px] font-[600] text-[#333333]">AI Document Processing</h4>
                        <p className="text-[14px] font-[400] text-[#555555]">
                          Built a scalable AI document processing pipeline that reduced operational costs by 19% while
                          improving accuracy
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="bg-[#E8F0FE] p-2 rounded-full h-10 w-10 flex items-center justify-center">
                        <svg
                          className="h-5 w-5 text-[#4169E1]"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16 3.13C17.7699 3.58317 19.0078 5.17799 19.0078 7.005C19.0078 8.83201 17.7699 10.4268 16 10.88"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-[16px] font-[600] text-[#333333]">Process Automation</h4>
                        <p className="text-[14px] font-[400] text-[#555555]">
                          Drove automation initiatives across 300+ team members, saving 3 hours daily and reducing costs
                          by 20%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#F5F9FF] p-[20px] rounded-[12px]">
                <h3 className="text-[20px] font-[700] text-[#333333] mb-[12px] leading-[1.3] tracking-[-0.01em]">
                  My Mission
                </h3>
                <p className="text-[15px] font-[400] text-[#333333] italic">
                  "To empower organizations through AI-driven automation and intelligent workflows, creating sustainable
                  competitive advantages and driving meaningful business transformation."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

