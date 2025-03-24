import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Disclosure, Transition } from '@headlessui/react';

const faqs = [
  {
    question: 'AIコンサルティングの期間はどのくらいですか？',
    answer: '案件の規模や目的によって異なりますが、通常は3ヶ月〜1年程度です。まずは無料相談で、お客様のニーズに合わせた最適な期間をご提案させていただきます。',
  },
  {
    question: 'AIの知識が全くない状態でも相談できますか？',
    answer: 'はい、もちろん可能です。AIの基礎から丁寧にご説明させていただき、お客様のビジネスに最適なAIソリューションをご提案いたします。',
  },
  {
    question: '費用はどのくらいかかりますか？',
    answer: 'プロジェクトの規模や内容によって異なります。初回相談は無料で承っており、その際に具体的なお見積もりをご提示させていただきます。',
  },
  {
    question: '導入後のサポートはありますか？',
    answer: 'はい、導入後のサポートも充実しています。定期的なメンテナンスや改善提案、トラブル対応など、継続的なサポートを提供しています。',
  },
  {
    question: '他社との違いは何ですか？',
    answer: '豊富な実績と技術力に加え、お客様のビジネスに深く入り込んで課題を理解し、最適なソリューションを提供することが特徴です。また、導入後のサポートも手厚く行っています。',
  },
];

const FAQ = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              よくある質問
            </h2>
            <p className="text-xl text-gray-600">
              AIコンサルティングに関する疑問にお答えします
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Disclosure>
                  {({ open }) => (
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                      <Disclosure.Button className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50">
                        <span className="text-lg font-medium text-gray-900">
                          {faq.question}
                        </span>
                        <svg
                          className={`w-5 h-5 text-blue-500 transform ${
                            open ? 'rotate-180' : ''
                          } transition-transform duration-200`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </Disclosure.Button>
                      <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Disclosure.Panel className="px-6 py-4 text-gray-600">
                          {faq.answer}
                        </Disclosure.Panel>
                      </Transition>
                    </div>
                  )}
                </Disclosure>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ; 