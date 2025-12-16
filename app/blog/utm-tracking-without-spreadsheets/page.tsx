import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'UTM Tracking Without Spreadsheets: A Better Way to Manage Campaign Links',
  description: 'Stop managing UTM parameters in Google Sheets. Learn how modern marketing teams track campaigns without spreadsheet chaos.',
  keywords: 'utm tracking, utm spreadsheet, utm management, campaign tracking, utm builder, utm template',
  openGraph: {
    title: 'UTM Tracking Without Spreadsheets: A Better Way',
    description: 'Stop managing UTM parameters in Google Sheets. Learn how modern marketing teams track campaigns without spreadsheet chaos.',
    type: 'article',
    publishedTime: '2024-01-20',
  },
}

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-midnight-900 text-white">
      {/* Header */}
      <header className="border-b border-midnight-800 bg-midnight-900/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-camp-500 to-camp-400 flex items-center justify-center">
              <span className="text-midnight-900 font-bold text-lg">C</span>
            </div>
            <span className="font-display font-semibold text-lg">CampKit</span>
          </Link>
          <Link href="/signup" className="px-5 py-2.5 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-all">
            Try Free →
          </Link>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-midnight-500 mb-8">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-white">Blog</Link>
          <span>/</span>
          <span className="text-midnight-400">UTM Tracking Without Spreadsheets</span>
        </div>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-medium rounded-full">Tutorial</span>
            <span className="text-midnight-500 text-sm">6 min read</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight mb-6">
            UTM Tracking Without Spreadsheets: A Better Way
          </h1>
          <p className="text-xl text-midnight-400 leading-relaxed">
            Every marketing team eventually creates "the UTM spreadsheet." And every marketing team eventually hates it. Here's how to break free.
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <h2 className="font-display text-2xl font-bold mt-12 mb-4">The Spreadsheet Everyone Has</h2>
          <p className="text-midnight-300 mb-6">
            You know the one. It has tabs for each quarter, columns for source/medium/campaign, and a "DO NOT EDIT" warning in red at the top. Someone created it with the best intentions. Now it's a mess.
          </p>
          <p className="text-midnight-300 mb-6">
            Common problems with UTM spreadsheets:
          </p>
          <ul className="space-y-3 mb-8 text-midnight-300">
            <li className="flex items-start gap-3">
              <span className="text-red-400 mt-1">1.</span>
              <span><strong className="text-white">Version control nightmare.</strong> Is this the latest version? Did Sarah update it? Why are there three copies in the shared drive?</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 mt-1">2.</span>
              <span><strong className="text-white">Inconsistent naming.</strong> Despite the "conventions" tab, you still find "Google", "google", "GOOGLE", and "google.com" as sources.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 mt-1">3.</span>
              <span><strong className="text-white">No connection to actual performance.</strong> The spreadsheet has links, but clicks live in Bitly. Good luck matching them up.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 mt-1">4.</span>
              <span><strong className="text-white">Manual copy-paste errors.</strong> One typo in a URL parameter and your campaign attribution is broken.</span>
            </li>
          </ul>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">Why Spreadsheets Fail for UTM Tracking</h2>
          <p className="text-midnight-300 mb-6">
            Spreadsheets are amazing tools. But they're not designed for:
          </p>
          <div className="p-6 bg-midnight-800/50 rounded-xl border border-midnight-700 mb-8">
            <ul className="space-y-3 text-midnight-300">
              <li><strong className="text-white">URL generation.</strong> You can concatenate strings, but there's no validation. Typos happen.</li>
              <li><strong className="text-white">Real-time collaboration.</strong> Google Sheets helps, but conflicts still occur.</li>
              <li><strong className="text-white">Linking to analytics.</strong> Your spreadsheet doesn't know how many clicks each link got.</li>
              <li><strong className="text-white">Enforcing conventions.</strong> You can write rules, but you can't enforce them.</li>
            </ul>
          </div>
          <p className="text-midnight-300 mb-6">
            The result? You spend more time managing the spreadsheet than actually analyzing your campaigns.
          </p>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">What a Modern UTM Workflow Looks Like</h2>
          <p className="text-midnight-300 mb-6">
            Imagine this instead:
          </p>
          <ol className="space-y-4 mb-8 text-midnight-300">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-camp-500 text-midnight-900 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span><strong className="text-white">Paste your destination URL.</strong> Just the base URL, nothing else.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-camp-500 text-midnight-900 rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
              <span><strong className="text-white">Select a template.</strong> "Google Ads" automatically fills in source=google, medium=cpc. No typing.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-camp-500 text-midnight-900 rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</span>
              <span><strong className="text-white">Add your campaign name.</strong> The only thing you need to type.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-camp-500 text-midnight-900 rounded-full flex items-center justify-center text-sm font-bold shrink-0">4</span>
              <span><strong className="text-white">Get a short link automatically.</strong> No separate Bitly step. The link is ready to share.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-camp-500 text-midnight-900 rounded-full flex items-center justify-center text-sm font-bold shrink-0">5</span>
              <span><strong className="text-white">Track clicks in real-time.</strong> See who clicked, when, from where — without leaving the dashboard.</span>
            </li>
          </ol>
          <p className="text-midnight-300 mb-6">
            Total time: 30 seconds. Total spreadsheet updates required: zero.
          </p>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">Templates: The Key to Consistency</h2>
          <p className="text-midnight-300 mb-6">
            The biggest problem with spreadsheet-based UTM tracking is inconsistency. Templates solve this by:
          </p>
          <ul className="space-y-3 mb-8 text-midnight-300">
            <li className="flex items-start gap-3">
              <span className="text-camp-400 mt-1">✓</span>
              <span><strong className="text-white">Pre-defining source/medium combinations.</strong> "Facebook Ads" is always source=facebook, medium=paid_social. No variations.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-camp-400 mt-1">✓</span>
              <span><strong className="text-white">Sharing across the team.</strong> New team member? They use the same templates as everyone else.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-camp-400 mt-1">✓</span>
              <span><strong className="text-white">Reducing errors.</strong> Less typing = fewer mistakes.</span>
            </li>
          </ul>

          <h3 className="font-display text-xl font-semibold mt-8 mb-4">Example Templates</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-midnight-800/50 rounded-lg border border-midnight-700">
              <p className="font-medium text-sm mb-2">Google Ads</p>
              <p className="text-midnight-500 text-xs font-mono">source: google<br/>medium: cpc</p>
            </div>
            <div className="p-4 bg-midnight-800/50 rounded-lg border border-midnight-700">
              <p className="font-medium text-sm mb-2">Facebook Ads</p>
              <p className="text-midnight-500 text-xs font-mono">source: facebook<br/>medium: paid_social</p>
            </div>
            <div className="p-4 bg-midnight-800/50 rounded-lg border border-midnight-700">
              <p className="font-medium text-sm mb-2">Email Newsletter</p>
              <p className="text-midnight-500 text-xs font-mono">source: newsletter<br/>medium: email</p>
            </div>
            <div className="p-4 bg-midnight-800/50 rounded-lg border border-midnight-700">
              <p className="font-medium text-sm mb-2">LinkedIn Organic</p>
              <p className="text-midnight-500 text-xs font-mono">source: linkedin<br/>medium: organic_social</p>
            </div>
          </div>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">Analytics Without the Export Dance</h2>
          <p className="text-midnight-300 mb-6">
            With spreadsheet tracking, analyzing performance means:
          </p>
          <ol className="list-decimal list-inside space-y-2 mb-6 text-midnight-400">
            <li>Export click data from Bitly</li>
            <li>Match Bitly links to spreadsheet rows</li>
            <li>Create pivot tables</li>
            <li>Hope nothing broke during the process</li>
          </ol>
          <p className="text-midnight-300 mb-6">
            With a dedicated UTM tool, you open the dashboard and see:
          </p>
          <ul className="space-y-2 mb-8 text-midnight-300">
            <li>• Which campaigns got the most clicks</li>
            <li>• Click trends over the last 7 days</li>
            <li>• Device breakdown (mobile vs desktop)</li>
            <li>• Geographic distribution</li>
            <li>• Traffic sources (referrers)</li>
          </ul>
          <p className="text-midnight-300 mb-6">
            No exports. No pivot tables. No matching. Just answers.
          </p>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">Making the Switch</h2>
          <p className="text-midnight-300 mb-6">
            If you're ready to ditch the spreadsheet, here's a simple migration path:
          </p>
          <ol className="space-y-4 mb-8 text-midnight-300">
            <li className="flex items-start gap-3">
              <span className="text-camp-400 font-bold">Week 1:</span>
              <span>Create templates for your most common link types (probably 5-10 templates cover 90% of use cases).</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-camp-400 font-bold">Week 2:</span>
              <span>Start creating new links in the tool instead of the spreadsheet. Don't migrate old links yet.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-camp-400 font-bold">Week 3+:</span>
              <span>Keep the spreadsheet as a read-only archive. All new links go through the proper tool.</span>
            </li>
          </ol>
          <p className="text-midnight-300 mb-6">
            You don't need to migrate everything at once. The spreadsheet can live alongside the new system until you're confident.
          </p>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">Choosing the Right Tool</h2>
          <p className="text-midnight-300 mb-6">
            There are several options for UTM management:
          </p>
          <ul className="space-y-3 mb-8 text-midnight-300">
            <li><strong className="text-white">UTM.io</strong> — Enterprise-focused, starts at $50+/month. Great for large organizations with complex governance needs.</li>
            <li><strong className="text-white">Google Campaign URL Builder</strong> — Free but bare-bones. No templates, no short links, no analytics.</li>
            <li><strong className="text-white">CampKit</strong> — Built for small-to-medium marketing teams. UTM builder + short links + analytics at €9/month.</li>
          </ul>
          <p className="text-midnight-300 mb-6">
            The right choice depends on your team size and budget. But almost anything is better than a spreadsheet.
          </p>

          {/* CTA */}
          <div className="my-12 p-8 bg-gradient-to-r from-camp-500/10 to-camp-400/10 rounded-2xl border border-camp-500/30 text-center">
            <h3 className="font-display text-2xl font-bold mb-3">Ready to ditch the spreadsheet?</h3>
            <p className="text-midnight-400 mb-6">CampKit's free plan includes 50 UTM links with templates. No spreadsheet required.</p>
            <Link href="/signup" className="inline-block px-8 py-4 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-bold rounded-xl transition-all">
              Try Free — No Credit Card →
            </Link>
          </div>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">Quick Reference: UTM Parameters</h2>
          <p className="text-midnight-300 mb-6">
            In case you need a refresher, here are the standard UTM parameters:
          </p>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-midnight-700">
                  <th className="text-left py-3 text-midnight-400 font-medium">Parameter</th>
                  <th className="text-left py-3 text-midnight-400 font-medium">Purpose</th>
                  <th className="text-left py-3 text-midnight-400 font-medium">Example</th>
                </tr>
              </thead>
              <tbody className="text-midnight-300">
                <tr className="border-b border-midnight-800">
                  <td className="py-3 font-mono text-camp-400">utm_source</td>
                  <td className="py-3">Where traffic comes from</td>
                  <td className="py-3 font-mono text-xs">google, facebook, newsletter</td>
                </tr>
                <tr className="border-b border-midnight-800">
                  <td className="py-3 font-mono text-camp-400">utm_medium</td>
                  <td className="py-3">Marketing channel type</td>
                  <td className="py-3 font-mono text-xs">cpc, email, social</td>
                </tr>
                <tr className="border-b border-midnight-800">
                  <td className="py-3 font-mono text-camp-400">utm_campaign</td>
                  <td className="py-3">Specific campaign name</td>
                  <td className="py-3 font-mono text-xs">spring_sale, product_launch</td>
                </tr>
                <tr className="border-b border-midnight-800">
                  <td className="py-3 font-mono text-camp-400">utm_term</td>
                  <td className="py-3">Paid keywords (optional)</td>
                  <td className="py-3 font-mono text-xs">running+shoes</td>
                </tr>
                <tr>
                  <td className="py-3 font-mono text-camp-400">utm_content</td>
                  <td className="py-3">Differentiate ads (optional)</td>
                  <td className="py-3 font-mono text-xs">banner_v1, text_link</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Author */}
        <footer className="mt-16 pt-8 border-t border-midnight-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-camp-500 rounded-full flex items-center justify-center text-midnight-900 font-bold">CK</div>
            <div>
              <p className="font-medium">CampKit Team</p>
              <p className="text-midnight-500 text-sm">Building better tools for marketing teams</p>
            </div>
          </div>
        </footer>
      </article>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-midnight-800">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-camp-500 to-camp-400 flex items-center justify-center">
              <span className="text-midnight-900 font-bold">C</span>
            </div>
            <span className="font-display font-semibold">CampKit</span>
          </Link>
          <p className="text-midnight-500 text-sm">© 2024 CampKit</p>
        </div>
      </footer>
    </div>
  )
}
