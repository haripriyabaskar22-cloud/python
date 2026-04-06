import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Sparkles, User, ArrowDown } from 'lucide-react';

// ── Format markdown → HTML ─────────────────────────────────────────────────
const fmt = (text) => {
  if (!text) return '';
  text = text.replace(/```[\w]*\n?([\s\S]*?)```/g,
    '<pre class="bg-[#0d1117] text-green-400 p-3 rounded-xl text-xs mt-2 mb-1 overflow-x-auto whitespace-pre font-mono leading-relaxed border border-[#30363d]">$1</pre>');
  text = text.replace(/`([^`\n]+)`/g,
    '<code class="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded font-mono text-xs font-bold">$1</code>');
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  text = text.replace(/\n/g, '<br/>');
  text = text.replace(/• /g, '&bull;&nbsp;');
  return text;
};

// ── Comprehensive Python Knowledge Base ────────────────────────────────────
const PY = {
  intro: {
    keys: ['what is python', 'about python', 'python language', 'python intro', 'python overview', 'who created python', 'history of python', 'guido'],
    answer: `**Python** is a high-level, interpreted, general-purpose programming language created by **Guido van Rossum** in 1991.\n\n• **Simple & Readable** — syntax reads almost like English\n• **Interpreted** — runs line by line, no compilation needed\n• **Dynamically typed** — no need to declare variable types\n• **Multi-paradigm** — supports OOP, functional, procedural\n• **Huge ecosystem** — web, AI/ML, data science, automation\n\n\`\`\`python\n# Python is this simple!\nname = "World"\nprint(f"Hello, {name}!")  # Hello, World!\n\`\`\``
  },

  variables: {
    keys: ['variable', 'variables', 'assignment', 'declare', 'naming', 'identifier', 'multiple assignment', 'swap variables'],
    answer: `**Variables** in Python are containers that store data. No type declaration needed!\n\n\`\`\`python\n# Single assignment\nname = "Ravi"\nage = 21\ngpa = 9.2\nis_student = True\n\n# Multiple assignment in one line\nx, y, z = 10, 20, 30\n\n# Swap without temp variable\na, b = b, a\n\n# Same value to multiple variables\nx = y = z = 0\n\`\`\`\n\n**Naming rules:**\n• Start with letter or underscore — not a digit\n• Only letters, digits, underscores — no spaces\n• Case-sensitive: \`name\` ≠ \`Name\`\n• Cannot use keywords: \`if\`, \`for\`, \`class\`, etc.`
  },

  datatypes: {
    keys: ['data type', 'datatype', 'type', 'int', 'float', 'str', 'bool', 'none', 'nonetype', 'type()', 'isinstance'],
    answer: `**Python Data Types:**\n\n\`\`\`python\n# Numbers\nx = 10        # int\ny = 3.14      # float\nz = 2 + 3j    # complex\n\n# Text\ns = "Hello"   # str\n\n# Boolean\nt = True      # bool (True or False)\n\n# Nothing\nn = None      # NoneType\n\n# Collections\nmy_list  = [1, 2, 3]          # list  — mutable, ordered\nmy_tuple = (1, 2, 3)          # tuple — immutable, ordered\nmy_set   = {1, 2, 3}          # set   — unique, unordered\nmy_dict  = {"a": 1, "b": 2}  # dict  — key-value pairs\n\n# Check type\nprint(type(x))        # <class 'int'>\nprint(isinstance(x, int))  # True\n\`\`\``
  },

  typeConversion: {
    keys: ['type conversion', 'casting', 'convert', 'int()', 'float()', 'str()', 'list()', 'tuple()', 'set()', 'type cast'],
    answer: `**Type Conversion** in Python:\n\n\`\`\`python\n# int to others\nx = 42\nprint(float(x))   # 42.0\nprint(str(x))     # "42"\nprint(bool(x))    # True (0 is False, anything else True)\n\n# float to others\nf = 3.9\nprint(int(f))     # 3  ← truncates, does NOT round\nprint(str(f))     # "3.9"\n\n# str to number\nprint(int("100"))    # 100\nprint(float("3.14")) # 3.14\n\n# Collections\nprint(list((1,2,3)))   # [1, 2, 3]\nprint(tuple([1,2,3]))  # (1, 2, 3)\nprint(set([1,1,2,3]))  # {1, 2, 3} — removes duplicates\n\n# User input is always str — convert it!\nage = int(input("Enter age: "))\n\`\`\``
  },

  operators: {
    keys: ['operator', 'operators', 'arithmetic', 'modulus', 'floor division', 'exponent', 'comparison', 'relational', 'logical', 'bitwise', 'assignment operator', 'compound assignment', 'walrus', ':='],
    answer: `**Python Operators:**\n\n\`\`\`python\n# Arithmetic\na, b = 10, 3\nprint(a + b)   # 13  addition\nprint(a - b)   # 7   subtraction\nprint(a * b)   # 30  multiplication\nprint(a / b)   # 3.333  true division (always float)\nprint(a // b)  # 3   floor division (integer result)\nprint(a % b)   # 1   modulus (remainder)\nprint(a ** b)  # 1000 exponentiation (power)\n\n# Comparison — return True or False\nprint(a == b)  # False\nprint(a != b)  # True\nprint(a > b)   # True\nprint(a <= b)  # False\n\n# Logical\nprint(a > 0 and b > 0)   # True  — both must be True\nprint(a > 0 or  b < 0)   # True  — at least one True\nprint(not (a > 0))       # False — negates\n\n# Compound assignment\na += 5   # a = a + 5 = 15\na -= 2   # a = a - 2 = 13\na *= 2   # a = a * 2 = 26\na //= 3  # a = a // 3 = 8\n\n# Walrus operator (Python 3.8+)\nif n := len("hello"):\n    print(f"Length is {n}")  # Length is 5\n\`\`\``
  },

  strings: {
    keys: ['string', 'strings', 'str', 'f-string', 'fstring', 'format', 'upper', 'lower', 'split', 'join', 'replace', 'strip', 'find', 'slice', 'slicing', 'len', 'concatenation', 'substring', 'startswith', 'endswith', 'count', 'index'],
    answer: `**Python Strings** — immutable sequences of characters:\n\n\`\`\`python\ns = "Hello, Python!"\n\n# Length & access\nprint(len(s))       # 14\nprint(s[0])         # H\nprint(s[-1])        # !\nprint(s[0:5])       # Hello   (slicing)\nprint(s[::2])       # Hlo yhn (every 2nd char)\n\n# Common methods\nprint(s.upper())    # HELLO, PYTHON!\nprint(s.lower())    # hello, python!\nprint(s.strip())    # removes whitespace from both ends\nprint(s.replace("Python", "World"))  # Hello, World!\nprint(s.split(", ")) # ['Hello', 'Python!']\nprint(s.find("Python"))  # 7 — index of first match\nprint(s.startswith("Hello"))  # True\nprint(s.count("l"))  # 2\n\n# F-strings (best way to format)\nname, age = "Ravi", 21\nprint(f"Name: {name}, Age: {age}")     # Name: Ravi, Age: 21\nprint(f"Next year: {age + 1}")          # Next year: 22\nprint(f"Pi = {3.14159:.2f}")           # Pi = 3.14\n\n# Join\nwords = ["Hello", "World"]\nprint(" ".join(words))  # Hello World\n\`\`\``
  },

  lists: {
    keys: ['list', 'lists', 'append', 'extend', 'insert', 'remove', 'pop', 'sort', 'reverse', 'index', 'list comprehension', 'comprehension', 'slice list', '2d list', 'nested list'],
    answer: `**Python Lists** — ordered, mutable collections:\n\n\`\`\`python\nfruits = ["apple", "banana", "cherry"]\n\n# Access\nprint(fruits[0])    # apple\nprint(fruits[-1])   # cherry\nprint(fruits[1:3])  # ['banana', 'cherry']\n\n# Add\nfruits.append("mango")        # add to end\nfruits.insert(1, "orange")   # insert at index 1\nfruits.extend(["grape","kiwi"]) # add multiple\n\n# Remove\nfruits.remove("banana")  # removes by value\nfruits.pop()             # removes last element\nfruits.pop(0)            # removes by index\n\n# Useful\nprint(len(fruits))        # length\nfruits.sort()             # sort ascending\nfruits.sort(reverse=True) # sort descending\nfruits.reverse()          # reverse in-place\nprint(fruits.index("cherry"))  # find index\nprint("apple" in fruits)  # True/False\n\n# List comprehension — most Pythonic way!\nsquares = [x**2 for x in range(1, 6)]\nprint(squares)  # [1, 4, 9, 16, 25]\n\nevens = [x for x in range(10) if x % 2 == 0]\nprint(evens)  # [0, 2, 4, 6, 8]\n\`\`\``
  },

  tuples: {
    keys: ['tuple', 'tuples', 'immutable', 'packing', 'unpacking', 'named tuple'],
    answer: `**Python Tuples** — ordered, **immutable** (cannot change after creation):\n\n\`\`\`python\n# Creation\ncoords = (10, 20)\npoint  = (3.5, 7.2, 0.0)\nsingle = (42,)   # single-element: comma is required!\nempty  = ()\n\n# Access — same as list\nprint(coords[0])    # 10\nprint(coords[-1])   # 20\nprint(coords[0:2])  # (10, 20)\n\n# Unpacking\nx, y = coords\nprint(x, y)   # 10 20\n\na, *rest, last = (1, 2, 3, 4, 5)\nprint(a)     # 1\nprint(rest)  # [2, 3, 4]\nprint(last)  # 5\n\n# Tuples are faster than lists\n# Use when data must NOT change: dates, coordinates, RGB values\n\n# Count & find\nt = (1, 2, 2, 3, 2)\nprint(t.count(2))  # 3\nprint(t.index(3))  # 3\n\`\`\``
  },

  sets: {
    keys: ['set', 'sets', 'union', 'intersection', 'difference', 'add', 'discard', 'frozenset', 'unique'],
    answer: `**Python Sets** — unordered collections of **unique** values:\n\n\`\`\`python\n# Creation\ncolors = {"red", "green", "blue"}\nnums   = set([1, 2, 2, 3, 3, 4])  # {1, 2, 3, 4} — duplicates removed!\n\n# Add & remove\ncolors.add("yellow")\ncolors.discard("red")   # safe — no error if not found\ncolors.remove("green")  # raises KeyError if not found\n\n# Check membership — very fast!\nprint("blue" in colors)  # True\n\n# Set operations\na = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\n\nprint(a | b)   # {1,2,3,4,5,6} — union (all elements)\nprint(a & b)   # {3, 4}         — intersection (common)\nprint(a - b)   # {1, 2}         — difference (in a not b)\nprint(a ^ b)   # {1,2,5,6}     — symmetric difference\n\n# Subset / superset\nprint({1,2} <= {1,2,3})  # True — subset\nprint({1,2,3} >= {1,2})  # True — superset\n\`\`\``
  },

  dicts: {
    keys: ['dict', 'dictionary', 'dictionaries', 'keys', 'values', 'items', 'get', 'update', 'del', 'pop dict', 'dict comprehension', 'nested dict', 'defaultdict'],
    answer: `**Python Dictionaries** — key-value pairs:\n\n\`\`\`python\nstudent = {"name": "Ravi", "age": 21, "grade": "A"}\n\n# Access\nprint(student["name"])        # Ravi\nprint(student.get("age"))     # 21\nprint(student.get("score", 0)) # 0 — default if key missing\n\n# Add & update\nstudent["score"] = 95         # add new key\nstudent["age"] = 22           # update existing\nstudent.update({"city": "Chennai", "score": 98})\n\n# Remove\ndel student["grade"]          # delete key\npopped = student.pop("city")  # removes & returns value\n\n# Iterate\nfor key in student.keys():\n    print(key)\n\nfor val in student.values():\n    print(val)\n\nfor key, val in student.items():\n    print(f"{key}: {val}")\n\n# Dict comprehension\nsquares = {x: x**2 for x in range(1, 6)}\nprint(squares)  # {1:1, 2:4, 3:9, 4:16, 5:25}\n\n# Check key\nprint("name" in student)  # True\n\`\`\``
  },

  conditionals: {
    keys: ['if', 'else', 'elif', 'conditional', 'if else', 'ternary', 'match case', 'decision', 'condition'],
    answer: `**Conditional Statements** in Python:\n\n\`\`\`python\nscore = 75\n\n# if / elif / else\nif score >= 90:\n    print("Grade A")\nelif score >= 75:\n    print("Grade B")   # This runs\nelif score >= 60:\n    print("Grade C")\nelse:\n    print("Fail")\n\n# Ternary (one-liner)\nstatus = "Pass" if score >= 60 else "Fail"\nprint(status)   # Pass\n\n# Nested conditions\nif score > 0:\n    if score >= 75:\n        print("Good score!") # runs\n\n# match-case (Python 3.10+)\nday = "Monday"\nmatch day:\n    case "Monday" | "Tuesday":\n        print("Early week")\n    case "Friday":\n        print("Weekend soon!")\n    case _:\n        print("Midweek")\n\`\`\``
  },

  loops: {
    keys: ['loop', 'loops', 'for loop', 'while loop', 'for', 'while', 'break', 'continue', 'pass', 'range', 'enumerate', 'zip', 'iterate', 'iteration', 'nested loop'],
    answer: `**Python Loops:**\n\n\`\`\`python\n# for loop — iterate over any sequence\nfor i in range(5):\n    print(i)   # 0 1 2 3 4\n\nfor i in range(1, 10, 2):\n    print(i)   # 1 3 5 7 9\n\n# iterate list\nfruits = ["apple", "mango", "cherry"]\nfor fruit in fruits:\n    print(fruit)\n\n# enumerate — get index AND value\nfor i, fruit in enumerate(fruits):\n    print(f"{i}: {fruit}")   # 0: apple, 1: mango...\n\n# zip — iterate two lists together\nnames  = ["Ravi", "Priya"]\nscores = [95, 88]\nfor name, score in zip(names, scores):\n    print(f"{name}: {score}")\n\n# while loop\nn = 1\nwhile n <= 5:\n    print(n)\n    n += 1\n\n# break — exit loop early\nfor i in range(10):\n    if i == 5:\n        break\n    print(i)   # 0 1 2 3 4\n\n# continue — skip current iteration\nfor i in range(5):\n    if i == 2:\n        continue\n    print(i)   # 0 1 3 4\n\n# else clause on loops (runs if no break)\nfor i in range(3):\n    print(i)\nelse:\n    print("Loop finished!")\n\`\`\``
  },

  functions: {
    keys: ['function', 'functions', 'def', 'return', 'parameter', 'argument', 'default parameter', 'args', 'kwargs', '*args', '**kwargs', 'lambda', 'scope', 'local', 'global', 'recursion', 'recursive'],
    answer: `**Python Functions:**\n\n\`\`\`python\n# Basic function\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Ravi"))   # Hello, Ravi!\n\n# Default parameters\ndef power(base, exp=2):\n    return base ** exp\n\nprint(power(3))     # 9   (exp defaults to 2)\nprint(power(2, 10)) # 1024\n\n# *args — variable positional arguments\ndef total(*nums):\n    return sum(nums)\n\nprint(total(1, 2, 3, 4))  # 10\n\n# **kwargs — variable keyword arguments\ndef profile(**info):\n    for key, val in info.items():\n        print(f"{key}: {val}")\n\nprofile(name="Ravi", age=21, city="Chennai")\n\n# Lambda — anonymous one-line function\nsquare = lambda x: x ** 2\nprint(square(5))   # 25\n\ndouble = lambda x: x * 2\nnums = [1, 2, 3, 4]\nprint(list(map(double, nums)))   # [2, 4, 6, 8]\nprint(list(filter(lambda x: x > 2, nums)))  # [3, 4]\n\n# Recursion\ndef factorial(n):\n    if n <= 1: return 1      # base case\n    return n * factorial(n-1) # recursive case\n\nprint(factorial(5))  # 120\n\`\`\``
  },

  oop: {
    keys: ['class', 'object', 'oop', 'object oriented', '__init__', 'self', 'method', 'attribute', 'inheritance', 'super', 'encapsulation', 'polymorphism', 'abstraction', 'constructor', 'instance', 'overriding', 'overloading', '__str__', '__repr__', 'dunder'],
    answer: `**Object-Oriented Programming in Python:**\n\n\`\`\`python\n# Define a class\nclass Student:\n    school = "ABC College"  # class variable (shared)\n\n    def __init__(self, name, age):  # constructor\n        self.name = name  # instance variable\n        self.age  = age\n\n    def greet(self):               # instance method\n        return f"Hi, I'm {self.name}"\n\n    def __str__(self):             # string representation\n        return f"Student({self.name}, {self.age})"\n\n# Create objects\ns1 = Student("Ravi", 21)\nprint(s1.greet())   # Hi, I'm Ravi\nprint(s1)           # Student(Ravi, 21)\n\n# Inheritance\nclass GradStudent(Student):     # inherits Student\n    def __init__(self, name, age, thesis):\n        super().__init__(name, age)  # call parent constructor\n        self.thesis = thesis\n\n    def greet(self):  # override parent method\n        return f"Hi, I'm {self.name}, researching {self.thesis}"\n\ng = GradStudent("Priya", 24, "AI")\nprint(g.greet())    # Hi, I'm Priya, researching AI\nprint(isinstance(g, Student))  # True\n\`\`\``
  },

  exceptions: {
    keys: ['exception', 'error', 'try', 'except', 'finally', 'raise', 'custom exception', 'error handling', 'valueerror', 'typeerror', 'indexerror', 'keyerror', 'zerodivisionerror', 'filenotfounderror'],
    answer: `**Exception Handling in Python:**\n\n\`\`\`python\n# Basic try/except\ntry:\n    x = int(input("Enter number: "))\n    result = 10 / x\n    print(f"Result: {result}")\nexcept ValueError:\n    print("Not a valid number!")\nexcept ZeroDivisionError:\n    print("Cannot divide by zero!")\nexcept Exception as e:\n    print(f"Unexpected error: {e}")\nelse:\n    print("No errors occurred!")  # runs only if no exception\nfinally:\n    print("This ALWAYS runs!")    # cleanup code\n\n# Raise exceptions manually\ndef set_age(age):\n    if age < 0:\n        raise ValueError("Age cannot be negative!")\n    return age\n\n# Custom exception class\nclass InsufficientFundsError(Exception):\n    def __init__(self, amount):\n        super().__init__(f"Need ₹{amount} more")\n\ndef withdraw(balance, amount):\n    if amount > balance:\n        raise InsufficientFundsError(amount - balance)\n    return balance - amount\n\`\`\``
  },

  modules: {
    keys: ['module', 'modules', 'import', 'from import', 'math', 'os', 'sys', 'random', 'datetime', 'json', 're', 'library', 'package', 'pip'],
    answer: `**Python Modules & Standard Library:**\n\n\`\`\`python\n# math — mathematical operations\nimport math\nprint(math.sqrt(16))    # 4.0\nprint(math.pi)          # 3.14159...\nprint(math.ceil(3.2))   # 4\nprint(math.floor(3.9))  # 3\n\n# random — random numbers\nimport random\nprint(random.randint(1, 100))       # random int 1-100\nprint(random.choice(["a","b","c"])) # random element\nrandom.shuffle([1,2,3,4,5])         # shuffle in-place\n\n# datetime\nfrom datetime import datetime, date\nnow = datetime.now()\nprint(now.strftime("%d/%m/%Y %H:%M")) # 17/03/2026 10:30\n\n# os — operating system\nimport os\nprint(os.getcwd())           # current directory\nprint(os.listdir("."))       # list files\nos.mkdir("new_folder")       # create folder\n\n# json\nimport json\ndata = {"name": "Ravi", "age": 21}\njson_str = json.dumps(data)  # dict → JSON string\nback     = json.loads(json_str) # JSON string → dict\n\n# re — regular expressions\nimport re\nmatches = re.findall(r"\\d+", "Room 101, Floor 3")\nprint(matches)  # ['101', '3']\n\`\`\``
  },

  fileIO: {
    keys: ['file', 'file i/o', 'open', 'read', 'write', 'with', 'readline', 'readlines', 'writelines', 'append file', 'csv', 'close', 'file handling'],
    answer: `**File Handling in Python:**\n\n\`\`\`python\n# Write to file\nwith open("data.txt", "w") as f:\n    f.write("Hello, World!\\n")\n    f.write("Python is great!\\n")\n\n# Read entire file\nwith open("data.txt", "r") as f:\n    content = f.read()\n    print(content)\n\n# Read line by line\nwith open("data.txt", "r") as f:\n    for line in f:\n        print(line.strip())\n\n# Read all lines as list\nwith open("data.txt", "r") as f:\n    lines = f.readlines()  # list of strings\n\n# Append to file (doesn't overwrite)\nwith open("data.txt", "a") as f:\n    f.write("New line added!\\n")\n\n# File modes:\n# "r"  — read (default)\n# "w"  — write (creates/overwrites)\n# "a"  — append\n# "rb" — read binary\n# "wb" — write binary\n\n# CSV files\nimport csv\nwith open("students.csv", "w", newline="") as f:\n    writer = csv.writer(f)\n    writer.writerow(["Name", "Score"])\n    writer.writerow(["Ravi", 95])\n\`\`\``
  },

  decorators: {
    keys: ['decorator', 'decorators', '@', 'staticmethod', 'classmethod', 'property', 'functools', 'wraps', '@staticmethod', '@classmethod', '@property'],
    answer: `**Python Decorators** — functions that modify other functions:\n\n\`\`\`python\n# Basic decorator\ndef uppercase(func):\n    def wrapper(*args, **kwargs):\n        result = func(*args, **kwargs)\n        return result.upper()\n    return wrapper\n\n@uppercase\ndef greet(name):\n    return f"hello, {name}"\n\nprint(greet("ravi"))  # HELLO, RAVI\n\n# Timing decorator\nimport time\ndef timer(func):\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        print(f"Time: {time.time()-start:.4f}s")\n        return result\n    return wrapper\n\n@timer\ndef slow():\n    time.sleep(0.1)\n\n# Built-in decorators in classes\nclass Circle:\n    def __init__(self, radius):\n        self._radius = radius\n\n    @property\n    def area(self):           # access like attribute, not method\n        return 3.14 * self._radius ** 2\n\n    @staticmethod\n    def shape_name():         # no self needed\n        return "Circle"\n\n    @classmethod\n    def unit(cls):            # access class itself\n        return cls(1)\n\nc = Circle(5)\nprint(c.area)               # 78.5 — no parentheses!\nprint(Circle.shape_name())  # Circle\n\`\`\``
  },

  generators: {
    keys: ['generator', 'generators', 'yield', 'iterator', 'next', 'generator expression', 'lazy evaluation'],
    answer: `**Python Generators** — memory-efficient iterators using \`yield\`:\n\n\`\`\`python\n# Generator function\ndef count_up(limit):\n    n = 1\n    while n <= limit:\n        yield n    # pauses here, returns value\n        n += 1\n\ng = count_up(5)\nprint(next(g))  # 1\nprint(next(g))  # 2\n\n# Better: use in a for loop\nfor num in count_up(5):\n    print(num)   # 1 2 3 4 5\n\n# Fibonacci generator (infinite!)\ndef fibonacci():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\nfib = fibonacci()\nfor _ in range(8):\n    print(next(fib), end=" ")  # 0 1 1 2 3 5 8 13\n\n# Generator expression (like list comp but lazy)\ngen = (x**2 for x in range(1000000))  # uses almost no memory!\nprint(next(gen))   # 0\nprint(next(gen))   # 1\n\n# Why use generators?\n# • Only computes values when needed\n# • Huge memory savings for large datasets\n\`\`\``
  },

  comprehensions: {
    keys: ['comprehension', 'list comprehension', 'dict comprehension', 'set comprehension', 'generator expression'],
    answer: `**Python Comprehensions** — concise, Pythonic way to create collections:\n\n\`\`\`python\n# List comprehension\nsquares  = [x**2 for x in range(1, 6)]\nprint(squares)   # [1, 4, 9, 16, 25]\n\nevens    = [x for x in range(20) if x % 2 == 0]\nprint(evens)     # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]\n\nupper    = [s.upper() for s in ["hi", "hello", "hey"]]\nprint(upper)     # ['HI', 'HELLO', 'HEY']\n\n# Nested list comprehension (2D matrix)\nmatrix = [[i*j for j in range(1, 4)] for i in range(1, 4)]\nprint(matrix)   # [[1,2,3],[2,4,6],[3,6,9]]\n\n# Dict comprehension\nword_len = {word: len(word) for word in ["apple", "mango", "fig"]}\nprint(word_len)  # {'apple': 5, 'mango': 5, 'fig': 3}\n\n# Set comprehension — unique values only\nunique_sq = {x**2 for x in [-2, -1, 0, 1, 2]}\nprint(unique_sq)  # {0, 1, 4}\n\n# Generator expression — lazy, memory-efficient\ntotal = sum(x**2 for x in range(1000000))  # no list created!\n\`\`\``
  },

  typeHints: {
    keys: ['type hint', 'type hints', 'annotation', 'typing', 'optional', 'list type', 'dict type', 'union', 'dataclass'],
    answer: `**Type Hints** in Python (Python 3.5+):\n\n\`\`\`python\nfrom typing import Optional, Union\n\n# Basic type hints\ndef greet(name: str) -> str:\n    return f"Hello, {name}!"\n\ndef add(a: int, b: int) -> int:\n    return a + b\n\n# Optional — value can be None\ndef find_user(id: int) -> Optional[str]:\n    users = {1: "Ravi", 2: "Priya"}\n    return users.get(id)   # returns str or None\n\n# Union — multiple types allowed\ndef process(value: Union[int, str]) -> str:\n    return str(value)\n\n# Collections\nfrom typing import List, Dict, Tuple\n\ndef average(nums: List[float]) -> float:\n    return sum(nums) / len(nums)\n\ndef get_profile() -> Dict[str, int]:\n    return {"age": 21, "score": 95}\n\n# Dataclass — clean alternative to __init__\nfrom dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: float\n    y: float\n    label: str = "point"  # default value\n\np = Point(1.0, 2.0)\nprint(p)  # Point(x=1.0, y=2.0, label='point')\n\`\`\``
  },

  regex: {
    keys: ['regex', 'regular expression', 're module', 'pattern', 'match', 'search', 'findall', 'sub', 'compile'],
    answer: `**Regular Expressions in Python:**\n\n\`\`\`python\nimport re\n\ntext = "My email is ravi@gmail.com and phone is 9876543210"\n\n# re.search — find first match\nm = re.search(r"\\d+", text)\nif m:\n    print(m.group())  # 9876543210\n\n# re.findall — find ALL matches\nnumbers = re.findall(r"\\d+", text)\nprint(numbers)  # ['9876543210']\n\n# re.match — match at beginning of string\nresult = re.match(r"My", text)\nprint(bool(result))  # True\n\n# re.sub — replace\nclean = re.sub(r"\\d+", "XXX", text)\nprint(clean)  # My email is ravi@gmail.com and phone is XXX\n\n# Common patterns\n# \\d  — digit     \\w  — word char     \\s  — whitespace\n# \\D  — non-digit \\W  — non-word      \\S  — non-whitespace\n# .   — any char  ^   — start         $   — end\n# *   — 0+        +   — 1+            ?   — 0 or 1\n# {3} — exactly 3 {2,5} — 2 to 5\n\n# Email validation example\nemail_pattern = r"^[\\w.-]+@[\\w.-]+\\.\\w{2,}$"\nprint(bool(re.match(email_pattern, "ravi@gmail.com")))  # True\n\`\`\``
  },

  helloWorld: {
    keys: ['hello world', 'first program', 'first python', 'getting started'],
    answer: `**Your first Python program:**\n\n\`\`\`python\n# hello.py\nprint("Hello, World!")\n\`\`\`\n\nThat's it! Run with: \`python hello.py\`\n\n**A slightly bigger first program:**\n\`\`\`python\n# Ask the user's name\nname = input("What is your name? ")\n\n# Greet them\nprint(f"Hello, {name}! Welcome to Python! 🐍")\n\n# Do some math\nage = int(input("How old are you? "))\nprint(f"In 10 years, you will be {age + 10} years old!")\n\`\`\``
  },

  inputOutput: {
    keys: ['input', 'output', 'print', 'input()', 'print()', 'user input', 'formatted output'],
    answer: `**Input & Output in Python:**\n\n\`\`\`python\n# Output — print()\nprint("Hello")                    # Hello\nprint("a", "b", "c")             # a b c\nprint("a", "b", sep="-")         # a-b\nprint("Hello", end=" ")          # no newline at end\nprint("World")                   # Hello World\n\n# Formatted output\nname, score = "Ravi", 95.678\nprint(f"Name: {name}")\nprint(f"Score: {score:.2f}")     # 2 decimal places → 95.68\nprint(f"Score: {score:>10.2f}") # right-aligned width 10\n\n# Input — always returns string!\nname = input("Enter name: ")\nage  = int(input("Enter age: "))   # convert to int\nprice = float(input("Price: "))    # convert to float\n\n# Input with default prompt\nresponse = input("Continue? (y/n): ").strip().lower()\nif response == "y":\n    print("Continuing...")\n\`\`\``
  },

  default: {
    keys: [],
    answer: `I can answer **any Python question**! 🐍 Try asking about:\n\n• **Basics** — variables, data types, operators, input/output\n• **Strings** — f-strings, slicing, methods\n• **Collections** — list, tuple, set, dict, comprehensions\n• **Control Flow** — if/elif/else, for, while, break, continue\n• **Functions** — def, return, *args, **kwargs, lambda\n• **OOP** — class, __init__, inheritance, super(), decorators\n• **Error Handling** — try/except/finally, raise, custom exceptions\n• **Modules** — math, os, random, datetime, json, re\n• **File I/O** — open(), read(), write(), with statement\n• **Advanced** — generators, type hints, dataclasses, regex\n\nJust type your question! 💬`
  }
};

// ── Answer engine ──────────────────────────────────────────────────────────
function getAnswer(question) {
  const q = question.toLowerCase().trim();

  // Direct topic match
  for (const topic of Object.values(PY)) {
    if (!topic.keys.length) continue;
    if (topic.keys.some(k => q.includes(k))) return topic.answer;
  }

  // Extended keyword fallbacks
  if (q.includes('print') || q.includes('input') || q.includes('output')) return PY.inputOutput.answer;
  if (q.includes('hello') || q.includes('first program')) return PY.helloWorld.answer;
  if (q.includes('comprehension') || q.includes('list comp')) return PY.comprehensions.answer;
  if (q.includes('generator') || q.includes('yield')) return PY.generators.answer;
  if (q.includes('decorator') || q.includes('@')) return PY.decorators.answer;
  if (q.includes('regex') || q.includes('regular exp') || q.includes(' re ') || q.includes('re.')) return PY.regex.answer;
  if (q.includes('file') || q.includes('open(') || q.includes('read') || q.includes('write')) return PY.fileIO.answer;
  if (q.includes('import') || q.includes('module') || q.includes('library') || q.includes('package')) return PY.modules.answer;
  if (q.includes('except') || q.includes('error') || q.includes('try') || q.includes('raise')) return PY.exceptions.answer;
  if (q.includes('class') || q.includes('object') || q.includes('inherit') || q.includes('self') || q.includes('oop')) return PY.oop.answer;
  if (q.includes('lambda') || q.includes('def ') || q.includes('function') || q.includes('return') || q.includes('args') || q.includes('kwargs')) return PY.functions.answer;
  if (q.includes('loop') || q.includes('for ') || q.includes('while') || q.includes('range') || q.includes('break') || q.includes('continue')) return PY.loops.answer;
  if (q.includes('if ') || q.includes('elif') || q.includes('condition') || q.includes('switch') || q.includes('ternary')) return PY.conditionals.answer;
  if (q.includes('dict') || q.includes('key') || q.includes('value') || q.includes('hashmap')) return PY.dicts.answer;
  if (q.includes('set') || q.includes('union') || q.includes('intersection')) return PY.sets.answer;
  if (q.includes('tuple') || q.includes('immutable')) return PY.tuples.answer;
  if (q.includes('list') || q.includes('append') || q.includes('array')) return PY.lists.answer;
  if (q.includes('string') || q.includes('str') || q.includes('f-string') || q.includes('fstring') || q.includes('slice') || q.includes('split') || q.includes('join')) return PY.strings.answer;
  if (q.includes('convert') || q.includes('cast') || q.includes('int(') || q.includes('float(') || q.includes('str(')) return PY.typeConversion.answer;
  if (q.includes('type') || q.includes('data type') || q.includes('datatype') || q.includes('bool') || q.includes('none')) return PY.datatypes.answer;
  if (q.includes('operator') || q.includes('modulus') || q.includes('arithmetic') || q.includes('%') || q.includes('**') || q.includes('//')) return PY.operators.answer;
  if (q.includes('variable') || q.includes('assign') || q.includes('declare')) return PY.variables.answer;
  if (q.includes('hint') || q.includes('typing') || q.includes('annotation') || q.includes('dataclass')) return PY.typeHints.answer;
  if (q.includes('python') || q.includes('what is') || q.includes('intro') || q.includes('history')) return PY.intro.answer;

  return PY.default.answer;
}

// ── Suggestion chips ────────────────────────────────────────────────────────
const CHIPS = [
  'What are Python operators?',
  'How do lists work?',
  'Explain loops in Python',
  'What is OOP in Python?',
  'How does try/except work?',
  'What is a lambda?',
  'Explain decorators',
  'How to handle files?',
];

// ── Main Component ──────────────────────────────────────────────────────────
export default function Chatbot() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [msgs,     setMsgs]     = useState([{
    id: 1, role: 'bot',
    text: 'Vanakkam! 🙏 I am your **Python AI Tutor**. Ask me *any* Python question — operators, loops, OOP, decorators, exceptions — I will explain it with examples and code!',
    time: new Date(),
  }]);
  const [input,    setInput]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const [hasNew,   setHasNew]   = useState(true);
  const [showDown, setShowDown] = useState(false);

  const bottomRef = useRef(null);
  const scrollRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    if (!showDown) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, loading, showDown]);

  useEffect(() => {
    if (isOpen) { setHasNew(false); setTimeout(() => inputRef.current?.focus(), 200); }
  }, [isOpen]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowDown(el.scrollHeight - el.scrollTop - el.clientHeight > 80);
  };

  const send = (questionText) => {
    const question = (questionText || input).trim();
    if (!question || loading) return;

    setInput('');
    setLoading(true);
    setShowDown(false);

    const userMsg = { id: Date.now(), role: 'user', text: question, time: new Date() };
    setMsgs(prev => [...prev, userMsg]);

    // Natural typing delay then instant local answer
    setTimeout(() => {
      const answer = getAnswer(question);
      setMsgs(prev => [...prev, { id: Date.now() + 1, role: 'bot', text: answer, time: new Date() }]);
      setHasNew(true);
      setLoading(false);
    }, 600 + Math.random() * 500);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      {/* ── Floating button ── */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-center gap-2">
        <AnimatePresence>
          {!isOpen && hasNew && (
            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
              className="bg-white text-slate-700 text-xs font-black px-3 py-2 rounded-2xl shadow-xl border-2 border-emerald-400 whitespace-nowrap flex items-center gap-2"
            >
              <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1 }}
                className="w-2 h-2 bg-emerald-500 rounded-full" />
              Ask Python questions! 🐍
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(o => !o)}
          className="w-16 h-16 rounded-full shadow-2xl flex items-center justify-center relative"
          style={{ background: isOpen ? 'linear-gradient(135deg,#ef4444,#dc2626)' : 'linear-gradient(135deg,#10b981,#059669)' }}
        >
          {!isOpen && (<>
            <motion.div animate={{ scale: [1, 2.3, 1], opacity: [0.4, 0, 0.4] }} transition={{ repeat: Infinity, duration: 2.5 }}
              className="absolute inset-0 rounded-full bg-emerald-400" />
            <motion.div animate={{ scale: [1, 1.7, 1], opacity: [0.25, 0, 0.25] }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.4 }}
              className="absolute inset-0 rounded-full bg-emerald-300" />
          </>)}
          <AnimatePresence mode="wait">
            {isOpen
              ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X size={26} className="text-white" /></motion.div>
              : <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><MessageCircle size={26} className="text-white" /></motion.div>
            }
          </AnimatePresence>
          {!isOpen && hasNew && (
            <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-black">!</motion.span>
          )}
        </motion.button>
      </div>

      {/* ── Chat window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.9 }} transition={{ type: 'spring', bounce: 0.2 }}
            className="fixed bottom-28 left-6 z-50 bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden"
            style={{ width: 375, height: 600 }}
          >
            {/* Header */}
            <div className="flex-shrink-0 p-4 flex items-center gap-3"
              style={{ background: 'linear-gradient(135deg,#10b981,#059669)' }}>
              <motion.div animate={{ rotate: [0, 12, -12, 0] }} transition={{ repeat: Infinity, duration: 4 }}
                className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center text-2xl flex-shrink-0">🤖</motion.div>
              <div className="flex-1 min-w-0">
                <h3 className="font-black text-white text-base flex items-center gap-2">
                  Python AI Tutor <Sparkles size={13} className="text-yellow-300 flex-shrink-0" />
                </h3>
                <p className="text-emerald-100 text-xs flex items-center gap-1.5">
                  <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 2 }}
                    className="w-2 h-2 bg-emerald-300 rounded-full flex-shrink-0" />
                  {loading ? 'Thinking...' : 'Ask any Python question!'}
                </p>
              </div>
              <motion.button whileHover={{ scale: 1.15, backgroundColor: 'rgba(239,68,68,0.5)' }} whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-full bg-white/25 border border-white/40 flex items-center justify-center transition-colors flex-shrink-0">
                <X size={18} className="text-white" />
              </motion.button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} onScroll={handleScroll} className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: '#f8fafc' }}>
              {msgs.map(msg => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}
                  className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-sm ${msg.role === 'bot' ? 'bg-emerald-100' : 'bg-indigo-100'}`}>
                    {msg.role === 'bot' ? '🤖' : <User size={13} className="text-indigo-600" />}
                  </div>
                  <div
                    className={`max-w-[84%] px-3 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-tl-sm'}`}
                    dangerouslySetInnerHTML={{ __html: msg.role === 'bot' ? fmt(msg.text) : msg.text }}
                  />
                </motion.div>
              ))}
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-sm">🤖</div>
                  <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center shadow-sm">
                    {[0, 1, 2].map(i => (
                      <motion.div key={i} animate={{ y: [0, -7, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                        className="w-2 h-2 bg-emerald-400 rounded-full" />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Scroll to bottom */}
            <AnimatePresence>
              {showDown && (
                <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  onClick={() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="absolute bottom-36 right-4 z-10 w-8 h-8 rounded-full bg-indigo-600 shadow-lg border-2 border-white flex items-center justify-center">
                  <ArrowDown size={15} className="text-white" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Chips */}
            <div className="flex-shrink-0 px-3 py-2 flex gap-2 overflow-x-auto border-t border-slate-100 bg-white" style={{ scrollbarWidth: 'none' }}>
              {CHIPS.map(chip => (
                <button key={chip} onClick={() => send(chip)} disabled={loading}
                  className="flex-shrink-0 text-xs px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 font-semibold hover:bg-emerald-100 active:bg-emerald-200 transition-colors disabled:opacity-40 whitespace-nowrap">
                  {chip}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex-shrink-0 p-3 border-t border-slate-100 bg-white flex gap-2 items-end">
              <textarea
                ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={onKeyDown} placeholder="Type any Python question… (Enter to send)"
                disabled={loading} rows={1}
                style={{ resize: 'none', minHeight: 42, maxHeight: 96, overflowY: 'auto' }}
                className="flex-1 px-4 py-2.5 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-emerald-400 text-sm bg-slate-50 disabled:opacity-60 leading-snug"
              />
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => send()} disabled={!input.trim() || loading}
                className="w-11 h-11 rounded-2xl flex items-center justify-center disabled:opacity-40 flex-shrink-0"
                style={{ background: 'linear-gradient(135deg,#10b981,#059669)' }}>
                <Send size={17} className="text-white" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
