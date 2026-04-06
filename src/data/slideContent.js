export const SLIDE_TEXTS = [
  // 0 - Title
  "Welcome to the Python Programming Masterclass — Complete Interactive Guide covering all 51 chapters! From Hello World all the way to Database Integration. Python is the world's number one programming language used by Google, NASA, Netflix, and millions of developers worldwide. Let's begin your journey from fundamentals to advanced mastery!",
  // 1 - Introduction
  "Chapter 1: Introduction to Python. Python is a high-level, interpreted programming language created with a focus on code readability and simplicity. Its design philosophy emphasizes clean syntax with significant indentation, making it perfect for beginners while powerful enough for experts. Python powers web development, data science, AI, and more.",
  // 2 - History
  "Chapter 2: History of Python. Python was conceived in the late 1980s by Guido van Rossum. It started as a Christmas hobby project in 1989. Python 1.0 officially launched in 1991. The name comes from Monty Python's Flying Circus, not the snake!",
  // 3 - Features
  "Chapter 3: Features of Python. Python stands out for its simple readable syntax, interpreted execution, dynamic typing, portability, and extensive ecosystem of over 300,000 packages.",
  // 4 - Architecture
  "Chapter 4: Python Architecture. Python code goes from source dot-py to bytecode dot-pyc, which is then executed by the Python Virtual Machine. This pipeline makes Python cross-platform and reliable.",
  // 5 - Hello World
  "Chapter 5: Your First Python Program. Python makes your first program incredibly easy — just one line: print('Hello World'). No classes or complex setup required. The hash symbol starts a comment.",

  // --- CHAPTER 6 VARIATIONS (6-9) ---
  // 6 (6.1.1)
  "Chapter 6: Variables. A variable is a named memory container that holds data. Creation is simple: name equals value. Python automatically detects the type.",
  // 7 (6.1)
  "Chapter 6.1: Booleans. Booleans represent one of two values: True or False. They are essential for conditional logic and control flow in every Python program.",
  // 8 (6.2)
  "Chapter 6.2: Variable Scope. Scope determines where a variable can be seen or used. Local variables exist inside functions, while global variables are accessible module-wide.",
  // 9 (6.3)
  "Chapter 6.3: Instance and Class Variables. Class variables are shared by all instances, while instance variables are unique to each object. Understanding this distinction is key to OOP.",

  // --- CHAPTER 7 VARIATIONS (10-12) ---
  // 10 (7.1.1)
  "Chapter 7: Data Types. Python has eight essential built-in data types including integers, floats, strings, booleans, lists, tuples, dictionaries, and sets.",
  // 11 (7.1)
  "Chapter 7.1: Integers. Integers store whole numbers of unlimited size. Python handles very large numbers automatically without the overflow issues found in other languages.",
  // 12 (7.2)
  "Chapter 7.2: Floats. Floating point numbers represent decimal values. Use them for scientific calculations and any data requiring fractional precision.",

  // --- CHAPTER 8 VARIATIONS (13-18) ---
  // 13 (8.1.1)
  "Chapter 8: Operators. Python provides a rich set of operators for arithmetic, comparison, logical, assignment, bitwise, identity, and membership operations.",
  // 14 (8.1)
  "Chapter 8.1: Arithmetic Operators. Includes addition, subtraction, multiplication, division, floor division, modulus, and exponentiation using double stars.",
  // 15 (8.2)
  "Chapter 8.2: Ternary Operator. A concise way to write if-else statements in a single line: value_if_true if condition else value_if_false.",
  // 16 (8.3)
  "Chapter 8.3: Logical Operators. Use 'and', 'or', and 'not' to combine conditions. They work on boolean values and follow standard truth table logic.",
  // 17 (8.4)
  "Chapter 8.4: Bitwise Operators. Perform operations on binary bits: AND, OR, XOR, NOT, and bit shifts. Used for low-level programming and optimization.",
  // 18 (8.5)
  "Chapter 8.5: Relational Operators. Compare values using equals, not-equals, greater than, and less than. They always return a boolean True or False.",

  // --- CHAPTER 9 VARIATIONS (19-24) ---
  // 19 (9.1.1)
  "Chapter 9: Conditional Statements. Control your program's path using if, elif, and else. Python uses indentation to define the blocks of code that run under each condition.",
  // 20 (9.1)
  "Chapter 9.1: The If Statement. The fundamental decision-making block. Code inside the if block only runs if the expression evaluates to True.",
  // 21 (9.2)
  "Chapter 9.2: If-Else. Provide a fallback path. If the condition is False, the code inside the else block will execute instead.",
  // 22 (9.3)
  "Chapter 9.3: Nested If. You can place if statements inside other if statements to handle complex, multi-layered decision logic.",
  // 23 (9.4)
  "Chapter 9.4: Elif Ladder. Use elif to check multiple distinct conditions in sequence. Only the first True condition's block will execute.",
  // 24 (9.5)
  "Chapter 9.5: Ternary Operations. Python's compact version of a conditional, allowing you to assign values based on a condition in a single line of code.",

  // --- CHAPTER 10 VARIATIONS (25-30) ---
  // 25 (10.1.1)
  "Chapter 10: Loops. Loops allow you to execute code repeatedly. Python supports for loops for iterating over sequences and while loops for conditional repetition.",
  // 26 (10.1)
  "Chapter 10.1: For Loops. Ideal for iterating over a sequence like a list, string, or range of numbers. It's the most common loop in Python.",
  // 27 (10.2)
  "Chapter 10.2: While Loops. Repeatedly executes a block of code as long as a given condition remains True. Be careful to avoid infinite loops!",
  // 28 (10.3)
  "Chapter 10.3: For-Each Pattern. Python's for loop naturally follows the for-each pattern, making it very easy to process every item in a collection.",
  // 29 (10.4)
  "Chapter 10.4: Simulation of Do-While. While Python doesn't have a native do-while, we simulate it using 'while True' combined with an internal 'break'.",
  // 30 (10.5)
  "Chapter 10.5: Loop Control Summary. Master 'break' to exit early, 'continue' to skip an iteration, and 'pass' as a syntactical placeholder.",

  // --- CHAPTERS 11-51 (31-71) ---
  // 31 - Ch 11
  "Chapter 11: Lists. Lists store multiple values in one variable. They are mutable, ordered, and indexed from zero. Slicing with colons extracts sublists.",
  // 32 - Ch 12
  "Chapter 12: List Operations. Python lists have numerous built-in methods: append, extend, insert, remove, pop, sort, and reverse.",
  // 33 - Ch 13
  "Chapter 13: Tuples. Tuples are immutable sequences. They are faster than lists and can be used as dictionary keys because they are hashable.",
  // 34 - Ch 14
  "Chapter 14: Dictionaries. Dictionaries store key-value pairs with fast lookup. Use the get() method for safe access without raising errors.",
  // 35 - Ch 15
  "Chapter 15: Sets. Sets are unordered collections of unique elements, optimized for membership testing and mathematical operations like union and intersection.",
  // 36 - Ch 16
  "Chapter 16: Strings. Strings are immutable sequences of Unicode characters. Python provides over 50 built-in methods for text manipulation.",
  // 37 - Ch 17
  "Chapter 17: String Formatting. F-strings are the modern standard. Use curly braces to embed expressions and colon-dot-2f for decimal precision.",
  // 38 - Ch 18
  "Chapter 18: Functions Basics. Reusable blocks defined with def. They take parameters and return values. Docstrings help document their purpose.",
  // 39 - Ch 19
  "Chapter 19: Advanced Functions. Supports default params, star-args for positional variations, and double-star-kwargs for keyword flexibility.",
  // 40 - Ch 20
  "Chapter 20: Scope and Namespace. Python follows LEGB: Local, Enclosing, Global, and Built-in. Global and nonlocal keywords help modify outer variables.",
  // 41 - Ch 21
  "Chapter 21: Lambda Functions. Small anonymous one-line functions. Commonly used with map, filter, and sorted for concise data processing.",
  // 42 - Ch 22
  "Chapter 22: List Comprehensions. Elegant one-liners: [expression for item in iterable if condition]. Faster and more readable for simple list creation.",
  // 43 - Ch 23
  "Chapter 23: Nested Data Structures. Lists within lists and dicts within lists allow representation of complex data like matrices and JSON records.",
  // 44 - Ch 24
  "Chapter 24: Copying. Shallow copy shares nested objects, while deep copy creates fully independent instances. Vital for avoiding accidental data mutation.",
  // 45 - Ch 25
  "Chapter 25: Classes and Objects. The core of OOP. Classes are blueprints, and objects are instances. The init method handles initialization.",
  // 46 - Ch 26
  "Chapter 26: Inheritance. Child classes acquire features from parents. Multiple inheritance is supported. Use super() to call parent methods.",
  // 47 - Ch 27
  "Chapter 27: Encapsulation. Protect data using underscores. Private attributes use double underscores. Properties provide clean getter and setter access.",
  // 48 - Ch 28
  "Chapter 28: Polymorphism. Different types can be treated as the same through shared method names. Python employs Duck Typing for flexibility.",
  // 49 - Ch 29
  "Chapter 29: Abstraction. Hide complexity using Abstract Base Classes. Enforce an interface by requiring subclasses to implement specific methods.",
  // 50 - Ch 30
  "Chapter 30: Magic Methods. Dunder methods like str, add, and len let your custom objects integrate perfectly with Python's built-in syntax.",
  // 51 - Ch 31
  "Chapter 31: Exceptions. Runtime errors that can be caught. Common types include ValueError, TypeError, and ZeroDivisionError.",
  // 52 - Ch 32
  "Chapter 32: Exception Handling. Use try, except, else, and finally to handle errors gracefully and ensure resource cleanup like closing files.",
  // 53 - Ch 33
  "Chapter 33: Custom Exceptions. Create your own error types by inheriting from the Exception class to make your error handling more precise.",
  // 54 - Ch 34
  "Chapter 34: File Operations. Open files using the with statement for automatic closing. Supports read, write, append, and binary modes.",
  // 55 - Ch 35
  "Chapter 35: Reading Files. Methods include read, readline, and readlines. Iterating over the file object is most memory-efficient for large files.",
  // 56 - Ch 36
  "Chapter 36: Writing Files. Use write and writelines. Remember that 'w' overwrites while 'a' appends. Always specify utf-8 encoding for safety.",
  // 57 - Ch 37
  "Chapter 37: CSV Handling. The csv module handles commas and quotes automatically. Support for both list-based and dictionary-based reading and writing.",
  // 58 - Ch 38
  "Chapter 38: JSON. Light-weight data format. Use dumps and loads for strings, and dump and load for files. Perfect for web APIs and configuration.",
  // 59 - Ch 39
  "Chapter 39: Modules. Reusable scripts. Import with keywords and use as aliases. The name-equals-main guard prevents unwanted execution on import.",
  // 60 - Ch 40
  "Chapter 40: Packages. Hierarchies of modules using init-py files. Organizes large codebases into clean, discoverable sub-units and namespaces.",
  // 61 - Ch 41
  "Chapter 41: Standard Library. Batteries included! Math, random, datetime, and os provide massive functionality without any external installs.",
  // 62 - Ch 42
  "Chapter 42: Third-Party Packages. Over 300k packages on PyPI. Install with pip. Powerhouses include NumPy, Pandas, Requests, and Flask.",
  // 63 - Ch 43
  "Chapter 43: Decorators. Wrap functions to add logic like logging or timing without modifying the original code. Uses the at-symbol syntax.",
  // 64 - Ch 44
  "Chapter 44: Generators. Use yield to produce values lazily. Extremely memory-efficient for processing large data streams or infinite sequences.",
  // 65 - Ch 45
  "Chapter 45: Iterators. Objects following the iterator protocol with iter and next methods. Powers all for-loops and sequence traversals in Python.",
  // 66 - Ch 46
  "Chapter 46: Context Managers. The with statement ensures setup and cleanup tasks are done, making your code safer and more readable.",
  // 67 - Ch 47
  "Chapter 47: Regular Expressions. Powerful pattern matching for searching and replacing text. The re module provides search, match, and sub functions.",
  // 68 - Ch 48
  "Chapter 48: Multithreading. Run tasks concurrently within one process. Best for I/O-bound work like network calls, though limited by the GIL.",
  // 69 - Ch 49
  "Chapter 49: Multiprocessing. Bypass the GIL using separate processes. Essential for CPU-bound tasks needing true parallel execution on multiple cores.",
  // 70 - Ch 50
  "Chapter 50: Date and Time. The datetime module handles calendars, clocks, and durations. Excellent support for formatting and parsing timestamps.",
  // 71 - Ch 51
  "Chapter 51: Database Integration. Connect to SQLite, PostgreSQL, or MySQL. Use parameterized queries to stay safe from SQL injection attacks.",

  // 72 - Final
  "Congratulations! You have mastered all 51 Python chapters — from Hello World to Database Integration. You are now ready to build real applications!"
];
