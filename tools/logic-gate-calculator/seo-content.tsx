export default function LogicGateCalculatorSEO() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-gray">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What are Logic Gates?</h2>
          <p className="text-gray-700 leading-relaxed">
            Logic gates are the fundamental building blocks of digital circuits and computer systems. They perform 
            basic logical operations on one or more binary inputs (0 or 1) to produce a single binary output. Logic 
            gates implement Boolean algebra and are used in processors, memory, controllers, and all digital devices. 
            Understanding logic gates is essential for digital electronics, computer architecture, programming, and 
            electrical engineering. The seven basic logic gates are AND, OR, NOT, NAND, NOR, XOR, and XNOR.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Basic Logic Gates</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">AND Gate (∧)</h3>
              <p className="text-sm text-blue-700 mb-2">
                <strong>Operation:</strong> Output is 1 (HIGH) only when ALL inputs are 1. Otherwise, output is 0 (LOW).
              </p>
              <p className="text-sm text-blue-700 mb-2">
                <strong>Formula:</strong> Y = A · B or Y = A AND B
              </p>
              <p className="text-sm text-blue-700">
                <strong>Example:</strong> 1 AND 1 = 1, 1 AND 0 = 0, 0 AND 0 = 0. Used in conditional logic, 
                enable signals, and masking operations. Real-world: Door lock that requires both key AND code.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">OR Gate (∨)</h3>
              <p className="text-sm text-green-700 mb-2">
                <strong>Operation:</strong> Output is 1 when AT LEAST ONE input is 1. Output is 0 only when all 
                inputs are 0.
              </p>
              <p className="text-sm text-green-700 mb-2">
                <strong>Formula:</strong> Y = A + B or Y = A OR B
              </p>
              <p className="text-sm text-green-700">
                <strong>Example:</strong> 1 OR 1 = 1, 1 OR 0 = 1, 0 OR 0 = 0. Used in combining signals, interrupt 
                handling, and selection logic. Real-world: Alarm triggered by motion sensor OR door sensor.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">NOT Gate (¬)</h3>
              <p className="text-sm text-purple-700 mb-2">
                <strong>Operation:</strong> Output is the INVERSE of input. Also called inverter. Single input gate.
              </p>
              <p className="text-sm text-purple-700 mb-2">
                <strong>Formula:</strong> Y = Ā or Y = NOT A
              </p>
              <p className="text-sm text-purple-700">
                <strong>Example:</strong> NOT 1 = 0, NOT 0 = 1. Used in signal inversion, complementing data, and 
                creating other gates. Real-world: Light switch (ON becomes OFF, OFF becomes ON).
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">NAND Gate (⊼)</h3>
              <p className="text-sm text-orange-700 mb-2">
                <strong>Operation:</strong> Output is 0 only when ALL inputs are 1. Inverse of AND gate. Universal gate.
              </p>
              <p className="text-sm text-orange-700 mb-2">
                <strong>Formula:</strong> Y = (A · B)' or Y = NOT (A AND B)
              </p>
              <p className="text-sm text-orange-700">
                <strong>Example:</strong> 1 NAND 1 = 0, 1 NAND 0 = 1, 0 NAND 0 = 1. Universal gate - can create any 
                other gate. Used extensively in IC design due to simplicity and versatility.
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-2">NOR Gate (⊽)</h3>
              <p className="text-sm text-red-700 mb-2">
                <strong>Operation:</strong> Output is 1 only when ALL inputs are 0. Inverse of OR gate. Universal gate.
              </p>
              <p className="text-sm text-red-700 mb-2">
                <strong>Formula:</strong> Y = (A + B)' or Y = NOT (A OR B)
              </p>
              <p className="text-sm text-red-700">
                <strong>Example:</strong> 0 NOR 0 = 1, 1 NOR 0 = 0, 1 NOR 1 = 0. Universal gate - can create any 
                other gate. Used in memory cells (SR latch) and control logic.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">XOR Gate (⊕)</h3>
              <p className="text-sm text-yellow-700 mb-2">
                <strong>Operation:</strong> Output is 1 when inputs are DIFFERENT. Output is 0 when inputs are SAME. 
                Exclusive OR.
              </p>
              <p className="text-sm text-yellow-700 mb-2">
                <strong>Formula:</strong> Y = A ⊕ B or Y = A'B + AB'
              </p>
              <p className="text-sm text-yellow-700">
                <strong>Example:</strong> 1 XOR 0 = 1, 0 XOR 1 = 1, 1 XOR 1 = 0, 0 XOR 0 = 0. Used in adders, 
                parity checkers, encryption, and error detection. Real-world: Comparing two values for difference.
              </p>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <h3 className="font-semibold text-indigo-900 mb-2">XNOR Gate (⊙)</h3>
              <p className="text-sm text-indigo-700 mb-2">
                <strong>Operation:</strong> Output is 1 when inputs are SAME. Output is 0 when inputs are DIFFERENT. 
                Inverse of XOR.
              </p>
              <p className="text-sm text-indigo-700 mb-2">
                <strong>Formula:</strong> Y = (A ⊕ B)' or Y = AB + A'B'
              </p>
              <p className="text-sm text-indigo-700">
                <strong>Example:</strong> 1 XNOR 1 = 1, 0 XNOR 0 = 1, 1 XNOR 0 = 0. Also called equivalence gate. 
                Used in comparators, error detection, and equality checking. Real-world: Password match verification.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Truth Tables Explained</h2>
          
          <p className="text-gray-700 mb-4">
            A truth table shows all possible input combinations and their corresponding outputs for a logic gate. 
            It's a complete specification of gate behavior. For n inputs, there are 2<sup>n</sup> possible combinations.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 mb-4">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">A</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">B</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">AND</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">OR</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">NAND</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">NOR</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">XOR</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">XNOR</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-center font-mono">0</td>
                  <td className="px-4 py-3 text-center font-mono">0</td>
                  <td className="px-4 py-3 text-center font-mono font-bold">0</td>
                  <td className="px-4 py-3 text-center font-mono font-bold">0</td>
                  <td className="px-4 py-3 text-center font-mono font-bold">1</td>
                  <td className="px-4 py-3 text-center font-mono font-bold">1</td>
                  <td className="px-4 py-3 text-center font-mono font-bold">0</td>
                  <td className="px-4 py-3 text-center font-mono font-bold">1</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-center font-mono">0</td>
                  <td className="px-4 py-3 text-center font-mono">1</td>
                  <td className="px-4 py-3 text-center font-mono font-bold">0</td>
                  <td className="px-4 py-3 text-center font-mono font-bold">1</td>
                  <td className="px-4 py-3 text-center font-mono font-bold">1</td>
                  <td className="px-4 py-3 text-center font-mono font-bold">0</td>
                  <td className="px-4 py-3 text-center font-mono font-bold">1</td>
                  <td className="px-4 py-3 text-center font-mono font-bold">0</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-center font-mono">1</td>
                  <td className="px-4 py-3 text-center font-mono">0</td>
                  <td className="px-4 py-3 text-center font-mono font-bold">0</td>
                  <td className="px-4 py-3 text-center font-mono font-bold">1</td>
                  <td className="px-4 py-3 text-center font-mono font-bold">1</td>
                  <td className="px-4 py-3 text-center font-mono font-bold">0</td>
                  <td className="px-4 py-3 text-center font-mono font-bold">1</td>
                  <td className="px-4 py-3 text-center font-mono font-bold">0</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-center font-mono">1</td>
                  <td className="px-4 py-3 text-center font-mono">1</td>
                  <td className="px-4 py-3 text-center font-mono font-bold">1</td>
                  <td className="px-4 py-3 text-center font-mono font-bold">1</td>
                  <td className="px-4 py-3 text-center font-mono font-bold">0</td>
                  <td className="px-4 py-3 text-center font-mono font-bold">0</td>
                  <td className="px-4 py-3 text-center font-mono font-bold">0</td>
                  <td className="px-4 py-3 text-center font-mono font-bold">1</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-gray-700">
            <strong>Reading Truth Tables:</strong> Each row represents one possible input combination. The output 
            column shows the gate's response. Truth tables are used for circuit design, verification, and debugging.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Universal Gates</h2>
          
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>NAND Gate - Universal Gate:</strong> NAND gate can implement any Boolean function. You can 
                create AND, OR, NOT, and all other gates using only NAND gates. This makes NAND gates extremely 
                important in IC design. Example: NOT gate = NAND with inputs tied together. AND gate = NAND followed 
                by NOT. OR gate = NAND with inverted inputs.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>NOR Gate - Universal Gate:</strong> NOR gate can also implement any Boolean function. Like 
                NAND, you can create all other gates using only NOR gates. Used in memory cells (SR latch, flip-flops). 
                Example: NOT gate = NOR with inputs tied together. OR gate = NOR followed by NOT. AND gate = NOR 
                with inverted inputs.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Why Universal Gates Matter:</strong> In IC manufacturing, using only one type of gate 
                (NAND or NOR) simplifies design, reduces cost, and improves reliability. Most digital ICs are built 
                primarily with NAND gates due to their speed and efficiency. Understanding universal gates is crucial 
                for digital circuit design and optimization.
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Logic Gate Applications</h2>
          
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Arithmetic Circuits:</strong> Half adders and full adders use XOR and AND gates to perform 
                binary addition. Subtractors use XOR with NOT gates. ALU (Arithmetic Logic Unit) in processors uses 
                combinations of logic gates for all arithmetic operations. Multipliers use arrays of AND gates with 
                adders.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Memory Circuits:</strong> SR latch (Set-Reset) uses NOR or NAND gates to store 1 bit. 
                D flip-flop uses multiple gates for synchronized data storage. RAM and ROM use arrays of logic gates. 
                Cache memory uses complex gate combinations for fast access. All computer memory fundamentally relies 
                on logic gates.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Control Logic:</strong> Multiplexers (MUX) use AND, OR, NOT gates to select data inputs. 
                Demultiplexers route signals to multiple outputs. Encoders and decoders convert between binary codes. 
                State machines use gates with feedback for sequential logic. Used in CPUs, controllers, and automation.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Error Detection:</strong> Parity checkers use XOR gates to detect single-bit errors in data 
                transmission. Hamming code uses multiple XOR gates for error correction. CRC (Cyclic Redundancy Check) 
                uses XOR in polynomial division. Essential for reliable communication and data storage.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Comparators:</strong> XNOR gates compare two bits for equality. Magnitude comparators use 
                combinations of gates to determine if A &gt; B, A &lt; B, or A = B. Used in sorting, searching, and 
                conditional operations. Essential in processors for branch instructions and conditional execution.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Encryption:</strong> XOR gates are fundamental in cryptography. Stream ciphers use XOR with 
                key stream. Block ciphers (AES, DES) use complex gate combinations. One-time pad uses XOR for 
                perfect encryption. Hash functions use extensive gate logic for data integrity.
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Boolean Algebra and Logic Gates</h2>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-blue-900 mb-3">Basic Boolean Laws</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <p><strong>Identity Law:</strong> A + 0 = A, A · 1 = A</p>
              <p><strong>Null Law:</strong> A + 1 = 1, A · 0 = 0</p>
              <p><strong>Idempotent Law:</strong> A + A = A, A · A = A</p>
              <p><strong>Complement Law:</strong> A + A' = 1, A · A' = 0</p>
              <p><strong>Commutative Law:</strong> A + B = B + A, A · B = B · A</p>
              <p><strong>Associative Law:</strong> (A + B) + C = A + (B + C)</p>
              <p><strong>Distributive Law:</strong> A · (B + C) = A · B + A · C</p>
              <p><strong>De Morgan's Theorem:</strong> (A + B)' = A' · B', (A · B)' = A' + B'</p>
            </div>
          </div>

          <p className="text-sm text-gray-700">
            Boolean algebra provides mathematical foundation for logic gates. These laws allow circuit simplification, 
            optimization, and transformation. De Morgan's theorem is particularly useful for converting between NAND/NOR 
            and other gates. Understanding Boolean algebra is essential for digital design and computer science.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Logic Gate Implementation</h2>
          
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>TTL (Transistor-Transistor Logic):</strong> Uses bipolar junction transistors (BJTs). Fast 
                switching speed, high power consumption. Common ICs: 7400 series (7408 AND, 7432 OR, 7404 NOT). 
                Operating voltage: 5V. Used in older systems and educational projects. Being replaced by CMOS in 
                modern designs.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>CMOS (Complementary Metal-Oxide-Semiconductor):</strong> Uses MOSFETs (both NMOS and PMOS). 
                Very low power consumption, slower than TTL. Common ICs: 4000 series (4081 AND, 4071 OR, 4069 NOT). 
                Operating voltage: 3-15V. Dominant technology in modern ICs, processors, and memory. Used in all 
                smartphones, computers, and digital devices.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Discrete Components:</strong> Can build logic gates using individual transistors, resistors, 
                and diodes. Educational value for understanding gate operation. Diode logic (AND, OR) is simple but 
                has limitations. Transistor logic provides better performance. Used in custom circuits and prototyping.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>FPGA and CPLD:</strong> Field Programmable Gate Arrays implement logic gates using lookup 
                tables (LUTs) and programmable interconnects. Allows custom logic without manufacturing ICs. Used in 
                prototyping, signal processing, and specialized applications. Can implement millions of gates. 
                Reconfigurable hardware.
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is the difference between AND and NAND gates?</h3>
              <p className="text-sm text-gray-700">
                AND gate outputs 1 only when both inputs are 1. NAND gate is the inverse - it outputs 0 only when 
                both inputs are 1, otherwise outputs 1. NAND is a universal gate (can create any other gate), while 
                AND is not. In IC design, NAND gates are preferred because they're simpler to manufacture and faster 
                than AND gates. NAND = NOT + AND.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is XOR gate used for?</h3>
              <p className="text-sm text-gray-700">
                XOR (Exclusive OR) outputs 1 when inputs are different, 0 when same. Main uses: (1) Binary addition 
                - XOR gives sum bit in half adder. (2) Parity checking - XOR chain detects odd/even number of 1s. 
                (3) Encryption - XOR with key for simple cipher. (4) Comparison - detects if two bits differ. (5) 
                Toggle - XOR with 1 inverts bit. Essential in arithmetic circuits, error detection, and cryptography.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Why are NAND and NOR called universal gates?</h3>
              <p className="text-sm text-gray-700">
                NAND and NOR are called universal gates because you can create ANY other logic gate using only NAND 
                or only NOR gates. For example, using only NAND: NOT = NAND with tied inputs, AND = NAND + NOT, 
                OR = NOT + NAND + NOT. This property is crucial in IC manufacturing - entire processors can be built 
                using primarily NAND gates, simplifying design and production. AND, OR, NOT are not universal.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do I read a truth table?</h3>
              <p className="text-sm text-gray-700">
                Truth table shows all possible input combinations and their outputs. Each row is one combination. 
                For 2 inputs (A, B), there are 4 rows: 00, 01, 10, 11. For 3 inputs, 8 rows. For n inputs, 2<sup>n</sup> 
                rows. Read left to right: input values, then output. Example: AND gate row "1 1 → 1" means when both 
                inputs are 1, output is 1. Truth tables completely define gate behavior and are used for circuit 
                design and verification.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What voltage levels represent 0 and 1 in logic gates?</h3>
              <p className="text-sm text-gray-700">
                In TTL (5V logic): 0 = 0-0.8V (LOW), 1 = 2-5V (HIGH). In CMOS (3.3V logic): 0 = 0-1V, 1 = 2.3-3.3V. 
                In CMOS (5V logic): 0 = 0-1.5V, 1 = 3.5-5V. The gap between LOW and HIGH provides noise immunity. 
                Modern processors use lower voltages (1.8V, 1.2V, 0.9V) for power efficiency. Arduino uses 5V logic, 
                Raspberry Pi uses 3.3V. Voltage level shifters needed when interfacing different logic families.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I build a computer using only logic gates?</h3>
              <p className="text-sm text-gray-700">
                Yes! All computers are fundamentally built from logic gates. CPU contains billions of transistors 
                forming logic gates. Basic components: (1) ALU - arithmetic using adders (XOR, AND gates). (2) 
                Registers - memory using flip-flops (NAND/NOR gates). (3) Control unit - state machines (various 
                gates). (4) Memory - arrays of latches. Simple 8-bit computer can be built with ~1000 gates. Modern 
                processors have billions of gates. Educational projects like Ben Eater's 8-bit computer demonstrate 
                this concept.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is propagation delay in logic gates?</h3>
              <p className="text-sm text-gray-700">
                Propagation delay is the time between input change and corresponding output change. Measured in 
                nanoseconds (ns). TTL gates: 5-10ns. CMOS gates: 10-50ns. Modern processors: &lt;1ns. Delay limits 
                maximum clock speed - faster gates allow higher frequencies. Caused by transistor switching time and 
                capacitance. Critical in timing analysis and high-speed design. Multiple gates in series add delays. 
                Affects maximum operating frequency of digital circuits.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-3">💡 Pro Tip</h2>
          <p className="text-sm text-blue-800 leading-relaxed">
            When learning logic gates, start with truth tables - they provide complete understanding of gate behavior. 
            Practice converting between different gate types using Boolean algebra and De Morgan's theorem. Remember 
            that NAND and NOR are universal gates - understanding how to build other gates from them is crucial for 
            digital design. Use online simulators to visualize complex circuits before building hardware. When 
            debugging digital circuits, check truth tables systematically for each gate. For exam preparation, 
            memorize truth tables for all seven basic gates and practice Boolean simplification. In practical 
            applications, always consider propagation delay and power consumption when selecting gate types.
          </p>
        </section>

      </div>
    </div>
  );
}
