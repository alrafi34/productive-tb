export default function RandomNamePickerSEOContent() {
  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          How to Use the Random Name Picker
        </h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Step 1: Add Names</h3>
            <p className="text-gray-600">
              Enter names one per line, paste from a spreadsheet, or import a TXT/CSV file.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Step 2: Configure Options</h3>
            <p className="text-gray-600">
              Set the number of winners, enable duplicate removal, and choose whether to remove winners after selection.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Step 3: Pick Winner</h3>
            <p className="text-gray-600">
              Click <strong>Pick Winner</strong> to randomly select from your list with optional animation.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Step 4: Save Results</h3>
            <p className="text-gray-600">
              Copy winners, download as TXT, or export history as CSV for record keeping.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          What is a Random Name Picker?
        </h2>
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            A <strong>random name picker</strong> is a tool that randomly selects one or more names from a list. It uses a fair randomization algorithm to ensure every name has an equal chance of being selected.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Perfect for raffles, giveaways, classroom activities, team selection, and any situation where you need to make an unbiased random choice from a group of people.
          </p>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Common Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">🎁 Giveaways & Raffles</h3>
            <p className="text-sm text-gray-700">
              Randomly select winners for contests, prizes, and promotional giveaways.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">🏫 Classroom Activities</h3>
            <p className="text-sm text-gray-700">
              Pick students for presentations, group assignments, or answering questions.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">👥 Team Selection</h3>
            <p className="text-sm text-gray-700">
              Create random teams or select team captains for sports and games.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">🎯 Decision Making</h3>
            <p className="text-sm text-gray-700">
              Make fair, unbiased decisions when choosing between multiple options.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Is the random selection truly random?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Yes! The tool uses the Fisher-Yates shuffle algorithm, which provides a fair and unbiased random selection. Every name has an equal probability of being chosen.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Can I pick multiple winners at once?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Absolutely! Set the "Number of Winners" option to any value up to the total number of names in your list. The tool will randomly select that many unique winners.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              What happens to winners after they're selected?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              You can choose! Enable "Remove Winner After Pick" to automatically remove selected names from the list, or keep them for multiple rounds of selection.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Can I import names from a file?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Yes! Click "Import File" to upload a TXT or CSV file. The tool will automatically parse the names and add them to your list.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
