import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'サービス',
      links: [
        { name: 'AI戦略コンサルティング', href: '#services' },
        { name: 'AI導入支援', href: '#services' },
        { name: 'AI人材育成', href: '#services' },
      ],
    },
    {
      title: '会社情報',
      links: [
        { name: 'プロフィール', href: '#profile' },
        { name: '実績', href: '#cases' },
        { name: 'よくある質問', href: '#faq' },
      ],
    },
    {
      title: 'お問い合わせ',
      links: [
        { name: '無料相談', href: '#contact' },
        { name: 'メール', href: 'mailto:info@example.com' },
        { name: 'TEL: 03-XXXX-XXXX', href: 'tel:0312345678' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ロゴ・概要 */}
          <div className="space-y-4">
            <Link 
              href="#home"
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              AIコンサルタント
            </Link>
            <p className="text-sm text-gray-400 mt-2">
              AIの力でビジネスの成長を加速させる、
              プロフェッショナルAIコンサルティングサービス
            </p>
          </div>

          {/* リンク */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4 text-white">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* コピーライト */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>© {currentYear} AIコンサルタント. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 