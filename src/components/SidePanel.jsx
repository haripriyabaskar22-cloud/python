import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Youtube, X, ExternalLink, Lock } from 'lucide-react';
import { SLIDE_TEXTS } from '../data/slideContent';

// ─────────────────── PYTHON Q&A (Full Local Knowledge Base) ─────────────────────
const PYTHON_QA = {
  // Greetings
  'hello': 'Hello! 👋 I am your Python AI Tutor! Ask me anything about Python — variables, loops, OOP, decorators, exceptions — I will answer with code examples!',
  'hi': 'Hi there! 😊 Ready to master Python? Ask me any question!',
  'hey': 'Hey! 🤖 What Python topic do you want to explore today?',

  // Intro
  'what is python': 'Python is a high-level, interpreted, general-purpose language created by **Guido van Rossum** in 1991.\n\n• **Simple & Readable** — syntax reads almost like English\n• **Dynamically typed** — no type declarations needed\n• **Multi-paradigm** — OOP, functional, procedural\n• **Huge ecosystem** — web, AI/ML, data science, automation\n```\nname = "World"\nprint(f"Hello, {name}!")  # Hello, World!\n```',
  'who created python': 'Python was created by **Guido van Rossum** in the Netherlands. Started as a hobby project in 1989, released publicly in 1991. Named after **Monty Python** comedy, not the snake! 🎭',
  'what is pip': 'pip is Python\'s package manager:\n```\npip install numpy\npip install pandas\npip install flask\n```\nOver 400,000 packages on PyPI (pypi.org)! 📦',

  // Variables
  'what is variable': 'A variable is a named container — no type declaration needed!\n```\nname = "Ravi"\nage = 21\ngpa = 9.2\nis_student = True\n\n# Multiple assignment\nx, y, z = 10, 20, 30\n\n# Swap\na, b = b, a\n```\nCase-sensitive: `name` ≠ `Name` ≠ `NAME` 📦',

  // Data types
  'what are data types': 'Python built-in types:\n```\nx = 10          # int\ny = 3.14        # float\ns = "Hello"     # str\nb = True        # bool\nn = None        # NoneType\n\n# Collections\nmy_list  = [1, 2, 3]       # list   — ordered, mutable\nmy_tuple = (1, 2, 3)       # tuple  — ordered, immutable\nmy_set   = {1, 2, 3}       # set    — unique, unordered\nmy_dict  = {"a": 1}        # dict   — key-value pairs\n\nprint(type(x))  # <class \'int\'>\n```',
  'what is int': '`int` stores whole numbers of unlimited size in Python — no overflow!\n```\nx = 42\ny = int("100")  # string → int\nz = int(3.9)    # float → int  = 3 (truncates!)\nprint(x + y)    # 142\n```',
  'what is float': '`float` stores decimal numbers.\n```\nf = 3.14\ng = float("9.99")  # string → float\nprint(round(f, 1))  # 3.1\nprint(f"{f:.2f}")   # "3.14" formatted\n```',
  'what is string': 'Strings store text — 50+ built-in methods!\n```\ns = "Hello, Python!"\nprint(s.upper())         # HELLO, PYTHON!\nprint(s.lower())         # hello, python!\nprint(s.split(", "))     # [\'Hello\', \'Python!\']\nprint(s.replace("Python","World"))  # Hello, World!\nprint(len(s))            # 14\nprint(s[0:5])            # Hello  (slicing)\n\n# F-strings (best way)\nname, age = "Ravi", 21\nprint(f"Name: {name}, Age: {age}")\nprint(f"Pi = {3.14159:.2f}")  # Pi = 3.14\n```',
  'what is bool': '`bool` has only two values: `True` and `False`.\n```\nt = True\nf = False\nprint(t and f)   # False\nprint(t or f)    # True\nprint(not t)     # False\n\n# Falsy values in Python:\n# False, None, 0, 0.0, "", [], {}, ()\nif []:  # empty list is falsy\n    print("never prints")\n```',

  // Type conversion
  'type conversion': 'Type conversion in Python:\n```\n# To int\nprint(int("42"))    # 42\nprint(int(3.9))     # 3  (truncates)\nprint(int(True))    # 1\n\n# To float\nprint(float("3.14")) # 3.14\nprint(float(42))     # 42.0\n\n# To string\nprint(str(42))       # "42"\nprint(str(3.14))     # "3.14"\n\n# Collections\nprint(list((1,2,3)))    # [1, 2, 3]\nprint(tuple([1,2,3]))   # (1, 2, 3)\nprint(set([1,1,2,3]))   # {1, 2, 3}\n```',

  // Operators
  'what is operator': 'Python operators:\n```\na, b = 10, 3\n\n# Arithmetic\nprint(a + b)   # 13\nprint(a - b)   # 7\nprint(a * b)   # 30\nprint(a / b)   # 3.333  (true division)\nprint(a // b)  # 3      (floor division)\nprint(a % b)   # 1      (modulus/remainder)\nprint(a ** b)  # 1000   (power)\n\n# Comparison — return True/False\nprint(a == b)  # False\nprint(a != b)  # True\nprint(a > b)   # True\n\n# Logical\nprint(a > 0 and b > 0)  # True\nprint(a > 0 or b < 0)   # True\nprint(not (a > 0))      # False\n\n# Compound assignment\na += 5   # a = 15\na -= 2   # a = 13\na *= 2   # a = 26\n```',

  // Strings
  'f-string': 'F-strings are the best way to format strings in Python 3.6+:\n```\nname = "Ravi"\nage = 21\nscore = 95.678\n\nprint(f"Name: {name}")\nprint(f"Age: {age + 1}")\nprint(f"Score: {score:.2f}")    # 95.68\nprint(f"Score: {score:>10.2f}") # right-aligned\nprint(f"Upper: {name.upper()}")\n```',

  // Lists
  'what is list': 'Lists — ordered, mutable collections:\n```\nfruits = ["apple", "banana", "cherry"]\n\n# Access\nprint(fruits[0])   # apple\nprint(fruits[-1])  # cherry\nprint(fruits[1:3]) # [\'banana\', \'cherry\']\n\n# Add\nfruits.append("mango")\nfruits.insert(1, "orange")\nfruits.extend(["grape","kiwi"])\n\n# Remove\nfruits.remove("banana")\nfruits.pop()       # removes last\nfruits.pop(0)      # removes by index\n\n# Other\nfruits.sort()\nfruits.reverse()\nprint(len(fruits))\nprint("apple" in fruits)\n\n# List comprehension\nsquares = [x**2 for x in range(1, 6)]\nprint(squares)  # [1, 4, 9, 16, 25]\n```',

  // Tuples
  'what is tuple': 'Tuples — ordered, **immutable** collections:\n```\ncoords = (10, 20)\npoint  = (3.5, 7.2, 0.0)\nsingle = (42,)  # single item needs comma!\n\n# Access same as list\nprint(coords[0])   # 10\n\n# Unpacking\nx, y = coords\nprint(x, y)  # 10 20\n\na, *rest, last = (1,2,3,4,5)\nprint(rest)  # [2, 3, 4]\n\n# Count & find\nt = (1,2,2,3)\nprint(t.count(2))  # 2\nprint(t.index(3))  # 3\n```',

  // Sets
  'what is set': 'Sets — unique, unordered collections:\n```\ncolors = {"red", "green", "blue"}\nnums   = set([1,2,2,3,3])  # {1,2,3} duplicates removed!\n\ncolors.add("yellow")\ncolors.discard("red")   # safe — no error if missing\n\n# Set operations\na = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\n\nprint(a | b)  # {1,2,3,4,5,6} union\nprint(a & b)  # {3,4}         intersection\nprint(a - b)  # {1,2}         difference\nprint(a ^ b)  # {1,2,5,6}    symmetric diff\n\nprint(3 in colors)  # True (very fast!)\n```',

  // Dicts
  'what is dict': 'Dictionaries — key-value pairs:\n```\nstudent = {"name":"Ravi", "age":21, "grade":"A"}\n\n# Access\nprint(student["name"])         # Ravi\nprint(student.get("score",0))  # 0 (default if missing)\n\n# Add & update\nstudent["score"] = 95\nstudent.update({"city":"Chennai"})\n\n# Remove\ndel student["grade"]\nstudent.pop("city")\n\n# Iterate\nfor key, val in student.items():\n    print(f"{key}: {val}")\n\n# Dict comprehension\nsquares = {x: x**2 for x in range(1,6)}\nprint(squares)  # {1:1, 2:4, 3:9, 4:16, 5:25}\n```',

  // Conditionals
  'what is if': 'Conditional statements in Python:\n```\nscore = 75\n\nif score >= 90:\n    print("Grade A")\nelif score >= 75:\n    print("Grade B")  # This runs\nelse:\n    print("Fail")\n\n# Ternary (one-liner)\nstatus = "Pass" if score >= 60 else "Fail"\nprint(status)  # Pass\n\n# match-case (Python 3.10+)\nmatch score:\n    case 100:\n        print("Perfect!")\n    case _ if score >= 75:\n        print("Good!")\n    case _:\n        print("Keep trying!")\n```',

  // Loops
  'what is loop': 'Python loops:\n```\n# for loop\nfor i in range(1, 6):\n    print(i)  # 1 2 3 4 5\n\n# iterate list\nfor fruit in ["apple","mango"]:\n    print(fruit)\n\n# enumerate — get index AND value\nfor i, v in enumerate(["a","b","c"]):\n    print(f"{i}: {v}")  # 0:a, 1:b, 2:c\n\n# zip — two lists together\nfor name, score in zip(["Ravi","Priya"],[95,88]):\n    print(f"{name}: {score}")\n\n# while loop\nn = 1\nwhile n <= 5:\n    print(n)\n    n += 1\n\n# break & continue\nfor i in range(10):\n    if i == 5: break       # stop\n    if i == 3: continue    # skip\n    print(i)\n```',

  // Functions
  'what is function': 'Functions in Python:\n```\n# Basic\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Ravi"))  # Hello, Ravi!\n\n# Default parameter\ndef power(base, exp=2):\n    return base ** exp\n\nprint(power(3))     # 9\nprint(power(2, 10)) # 1024\n\n# *args — variable positional\ndef total(*nums):\n    return sum(nums)\nprint(total(1,2,3,4))  # 10\n\n# **kwargs — variable keyword\ndef profile(**info):\n    for k, v in info.items():\n        print(f"{k}: {v}")\n\n# Lambda\nsquare = lambda x: x**2\nprint(square(5))  # 25\n```',

  // Exceptions
  'what is exception': 'Exception handling — catch errors gracefully:\n```\ntry:\n    x = int(input("Enter number: "))\n    result = 10 / x\nexcept ValueError:\n    print("Not a valid number!")\nexcept ZeroDivisionError:\n    print("Cannot divide by zero!")\nexcept Exception as e:\n    print(f"Error: {e}")\nelse:\n    print(f"Result: {result}")  # no exception\nfinally:\n    print("Always runs!")  # cleanup\n\n# Raise custom exception\nclass AgeError(Exception):\n    pass\n\ndef set_age(age):\n    if age < 0:\n        raise AgeError("Age cannot be negative!")\n```',

  // Modules
  'what is module': 'Python modules — reusable code libraries:\n```\nimport math\nprint(math.sqrt(16))    # 4.0\nprint(math.pi)          # 3.14159\nprint(math.ceil(3.2))   # 4\n\nimport random\nprint(random.randint(1, 100))\nprint(random.choice(["a","b","c"]))\n\nfrom datetime import datetime\nprint(datetime.now().strftime("%d/%m/%Y"))\n\nimport os\nprint(os.getcwd())\nprint(os.listdir("."))\n\nimport json\ndata = {"name":"Ravi","age":21}\nprint(json.dumps(data))  # JSON string\n```',

  // Decorators
  'what is decorator': 'Decorators modify functions using the @ symbol:\n```\n# Custom decorator\ndef uppercase(func):\n    def wrapper(*args, **kwargs):\n        result = func(*args, **kwargs)\n        return result.upper()\n    return wrapper\n\n@uppercase\ndef greet(name):\n    return f"hello, {name}"\n\nprint(greet("ravi"))  # HELLO, RAVI\n\n# Built-in class decorators\nclass Circle:\n    def __init__(self, r):\n        self._r = r\n\n    @property\n    def area(self):\n        return 3.14 * self._r ** 2\n\n    @staticmethod\n    def shape():  return "Circle"\n\nc = Circle(5)\nprint(c.area)          # 78.5\nprint(Circle.shape())  # Circle\n```',

  // Generators
  'what is generator': 'Generators — memory-efficient iterators using yield:\n```\ndef count_up(limit):\n    n = 1\n    while n <= limit:\n        yield n    # pauses here, returns value\n        n += 1\n\nfor num in count_up(5):\n    print(num)   # 1 2 3 4 5\n\n# Infinite fibonacci\ndef fibonacci():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a+b\n\nfib = fibonacci()\nfor _ in range(8):\n    print(next(fib), end=" ")  # 0 1 1 2 3 5 8 13\n\n# Generator expression\ngen = (x**2 for x in range(1000000))  # uses almost NO memory!\n```',

  // Files
  'what is file': 'File handling in Python:\n```\n# Write\nwith open("data.txt", "w") as f:\n    f.write("Hello, World!\\n")\n    f.write("Python is great!\\n")\n\n# Read all at once\nwith open("data.txt", "r") as f:\n    content = f.read()\n    print(content)\n\n# Read line by line\nwith open("data.txt") as f:\n    for line in f:\n        print(line.strip())\n\n# Append\nwith open("data.txt", "a") as f:\n    f.write("New line!\\n")\n\n# Modes: r=read, w=write, a=append, rb=binary read\n```',

  // Comprehensions
  'what is comprehension': 'Python comprehensions — Pythonic one-line collections:\n```\n# List comprehension\nsquares = [x**2 for x in range(1,6)]\nprint(squares)   # [1, 4, 9, 16, 25]\n\nevens = [x for x in range(20) if x%2==0]\nprint(evens)     # [0,2,4,6,8,10,12,14,16,18]\n\n# Dict comprehension\nword_len = {w: len(w) for w in ["apple","mango","fig"]}\n\n# Set comprehension\nunique_sq = {x**2 for x in [-2,-1,0,1,2]}\nprint(unique_sq)  # {0, 1, 4}\n\n# Generator (memory-efficient)\ntotal = sum(x**2 for x in range(1000000))\n```',

  // Hello World
  'hello world': '```python\nprint("Hello, World!")\n```\nJust ONE line — that is Python!\n```python\n# Slightly more\nname = input("Your name: ")\nprint(f"Hello, {name}! Welcome to Python! 🐍")\n```',

  'what is lambda': 'Lambda functions are one-line anonymous functions:\n```python\nsquare = lambda x: x**2\nprint(square(5))  # 25\n\n# Useful with sorted/map/filter\nnums = [1, 2, 3, 4]\ndoubled = list(map(lambda x: x*2, nums))\n```',

  'what is oop': 'Object-Oriented Programming (OOP) in Python uses classes and objects:\n```python\nclass Robot:\n    def __init__(self, name):\n        self.name = name\n    def say_hi(self):\n        print(f"I am {self.name}")\n\nbot = Robot("Dexter")\nbot.say_hi()\n```\nKey pillars: **Inheritance**, **Encapsulation**, **Polymorphism**, **Abstraction**.',

  'default': 'Great question! 🤔 I can help with **any Python topic**:\n\n• **Basics** — variables, data types, operators\n• **Control Flow** — if/elif, for, while, loops\n• **OOP** — class, inheritance, encapsulation\n• **Modules** — math, os, json, datetime\n• **File I/O** — open, read, write, csv\n• **Advanced** — decorators, generators, comprehensions\n\nJust type your question! 💬',
};

const findAnswer = (question) => {
  const q = question.toLowerCase().trim();
  if (PYTHON_QA[q]) return PYTHON_QA[q];
  for (const key of Object.keys(PYTHON_QA)) {
    if (q.includes(key)) return PYTHON_QA[key];
  }
  // Extended keyword fallbacks
  if (q.includes('pointer') || q.includes('memory address') || q.includes('reference')) return PYTHON_QA['what is pointer'];
  if (q.includes('comprehension') || q.includes('list comp')) return PYTHON_QA['what is comprehension'];
  if (q.includes('generator') || q.includes('yield')) return PYTHON_QA['what is generator'];
  if (q.includes('decorator') || q.includes('@property') || q.includes('@static')) return PYTHON_QA['what is decorator'];
  if (q.includes('file') || q.includes('open(') || q.includes('read') || q.includes('write')) return PYTHON_QA['what is file'];
  if (q.includes('import') || q.includes('module') || q.includes('library') || q.includes('package') || q.includes('pip')) return PYTHON_QA['what is module'];
  if (q.includes('except') || q.includes('error') || q.includes('try') || q.includes('raise')) return PYTHON_QA['what is exception'];
  if (q.includes('encapsul')) return PYTHON_QA['what is encapsulation'] || PYTHON_QA['what is oop'];
  if (q.includes('inherit')) return PYTHON_QA['what is inheritance'] || PYTHON_QA['what is oop'];
  if (q.includes('polymorphi') || q.includes('duck')) return PYTHON_QA['what is polymorphism'] || PYTHON_QA['what is oop'];
  if (q.includes('class') || q.includes('__init__') || q.includes('self')) return PYTHON_QA['what is class'] || PYTHON_QA['what is oop'];
  if (q.includes('object') || q.includes('instance')) return PYTHON_QA['what is object'] || PYTHON_QA['what is oop'];
  if (q.includes('oop') || q.includes('object orient')) return PYTHON_QA['what is oop'];
  if (q.includes('lambda') || q.includes('anonymous')) return PYTHON_QA['what is lambda'];
  if (q.includes('function') || q.includes('def ') || q.includes('return') || q.includes('args') || q.includes('kwargs')) return PYTHON_QA['what is function'];
  if (q.includes('loop') || q.includes('for ') || q.includes('while') || q.includes('range') || q.includes('break') || q.includes('continue')) return PYTHON_QA['what is loop'];
  if (q.includes('if ') || q.includes('elif') || q.includes('condition') || q.includes('ternary')) return PYTHON_QA['what is if'];
  if (q.includes('dict') || q.includes('key') || q.includes('hashmap')) return PYTHON_QA['what is dict'];
  if (q.includes('set') || q.includes('union') || q.includes('intersection')) return PYTHON_QA['what is set'];
  if (q.includes('tuple') || q.includes('immutable')) return PYTHON_QA['what is tuple'];
  if (q.includes('list') || q.includes('append') || q.includes('array')) return PYTHON_QA['what is list'];
  if (q.includes('f-string') || q.includes('fstring') || q.includes('format')) return PYTHON_QA['f-string'];
  if (q.includes('string') || q.includes('str') || q.includes('slice') || q.includes('split')) return PYTHON_QA['what is string'];
  if (q.includes('bool') || q.includes('true') || q.includes('false')) return PYTHON_QA['what is bool'];
  if (q.includes('convert') || q.includes('cast') || q.includes('int(') || q.includes('float(')) return PYTHON_QA['type conversion'];
  if (q.includes('data type') || q.includes('datatype') || q.includes('type') || q.includes('none')) return PYTHON_QA['what are data types'];
  if (q.includes('operator') || q.includes('modulus') || q.includes('arithmetic') || q.includes('%') || q.includes('**') || q.includes('//')) return PYTHON_QA['what is operator'];
  if (q.includes('variable') || q.includes('assign') || q.includes('declare')) return PYTHON_QA['what is variable'];
  if (q.includes('hello world') || q.includes('first program')) return PYTHON_QA['hello world'];
  if (q.includes('python') || q.includes('what is') || q.includes('history') || q.includes('guido')) return PYTHON_QA['what is python'];
  return PYTHON_QA['default'];
};

const formatMessage = (text) => {
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/```[\w]*\n?([\s\S]*?)```/g, '<pre class="bg-slate-900 text-green-400 p-3 rounded-xl text-xs mt-2 overflow-x-auto whitespace-pre font-mono leading-relaxed">$1</pre>');
  text = text.replace(/`(.*?)`/g, '<code class="bg-slate-800 text-emerald-400 px-1.5 py-0.5 rounded font-mono text-xs">$1</code>');
  text = text.replace(/\n/g, '<br/>');
  text = text.replace(/• /g, '&bull; ');
  return text;
};

const YOUTUBE_RESOURCES = [
  { topic: '1. Installation in Python', channel: 'Coding Boss Masterclass', url: 'https://youtu.be/Y6Flc1bxDMg?si=H-oY1XJd3wfy4R2f', emoji: '🏗️', level: 'Beginner', color: 'bg-blue-50 border-blue-200 text-blue-900', isLocked: false },
  { topic: '2. Introduction to Python', channel: 'Coding Boss Masterclass', url: 'https://youtu.be/sxLLbMk4ado?si=soI_7CKiRQfuM1hW', emoji: '🎯', level: 'Beginner', color: 'bg-blue-50 border-blue-200 text-blue-900', isLocked: false },
  { topic: '3. Variables in Python', channel: 'Coding Boss Masterclass', url: 'https://www.youtube.com/watch?v=FqOA5Y-YLT0', emoji: '📦', level: 'Beginner', color: 'bg-green-50 border-green-200 text-green-900', isLocked: false },
  { topic: '4. Classes and Objects', channel: 'Coding Boss Masterclass', url: 'https://www.youtube.com/watch?v=zHeyBHKGug0', emoji: '🏗️', level: 'Intermediate', color: 'bg-purple-50 border-purple-200 text-purple-900', isLocked: false },
  { topic: '5. Datatypes in python', channel: 'Coding Boss Masterclass', url: 'https://youtu.be/qfgM0ZC_NMQ?si=SLMYshkxtRIddvk8', emoji: '📊', level: 'Intermediate', color: 'bg-yellow-50 border-yellow-200 text-yellow-900', isLocked: false },
  { topic: '6. Operators in python', channel: 'Coding Boss Masterclass', url: 'https://youtu.be/cLjAERCQEtY?si=N_6g5dflOAJMtt8l', emoji: '⚙️', level: 'Intermediate', color: 'bg-red-50 border-red-200 text-red-900', isLocked: false },
  { topic: '7. Python UI: Intro to Tkinter', channel: 'Coding Boss Masterclass', url: '#', emoji: '🖥️', level: 'Intermediate', color: 'bg-slate-200 border-slate-400 text-slate-800', isLocked: true },
  { topic: '8. Modern Windows with CustomTkinter', channel: 'Coding Boss Masterclass', url: '#', emoji: '🎨', level: 'Intermediate', color: 'bg-slate-200 border-slate-400 text-slate-800', isLocked: true },
  { topic: '9. Introduction to PyQt5', channel: 'Coding Boss Masterclass', url: '#', emoji: '⚙️', level: 'Advanced', color: 'bg-slate-200 border-slate-400 text-slate-800', isLocked: true },
  { topic: '10. Streamlit for Web Apps', channel: 'Coding Boss Masterclass', url: '#', emoji: '🌐', level: 'Intermediate', color: 'bg-slate-200 border-slate-400 text-slate-800', isLocked: true },
  { topic: '11. Mobile Apps with Kivy', channel: 'Coding Boss Masterclass', url: '#', emoji: '📱', level: 'Advanced', color: 'bg-slate-200 border-slate-400 text-slate-800', isLocked: true },
  { topic: '12. PySide6 Layouts & Widgets', channel: 'Coding Boss Masterclass', url: '#', emoji: '🪟', level: 'Advanced', color: 'bg-slate-200 border-slate-400 text-slate-800', isLocked: true },
  { topic: '13. Fast UIs using Flet', channel: 'Coding Boss Masterclass', url: '#', emoji: '🦋', level: 'Intermediate', color: 'bg-slate-200 border-slate-400 text-slate-800', isLocked: true },
  { topic: '14. PySimpleGUI Crash Course', channel: 'Coding Boss Masterclass', url: '#', emoji: '🚀', level: 'Beginner', color: 'bg-slate-200 border-slate-400 text-slate-800', isLocked: true },
  { topic: '15. Multi-Window Architectures', channel: 'Coding Boss Masterclass', url: '#', emoji: '🧩', level: 'Advanced', color: 'bg-slate-200 border-slate-400 text-slate-800', isLocked: true },
  { topic: '16. UI/UX Best Practices', channel: 'Coding Boss Masterclass', url: '#', emoji: '✨', level: 'Advanced', color: 'bg-slate-200 border-slate-400 text-slate-800', isLocked: true },
];



export default function SidePanel({ currentSlide = 0 }) {
  const [activeModal, setActiveModal] = useState(null); // 'chat' | 'youtube' | null

  // Chat state
  const [messages, setMessages] = useState([
    { id: 1, role: 'bot', text: 'Hello! 👋 I am your **Python Programming AI Tutor**.\n\nAsk me **anything** about Python — operators, loops, OOP, decorators, exceptions, or any concept!\n\nI give clear explanations with code examples. 🚀' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const bottomRef = useRef(null);
  const chatInputRef = useRef(null);

  useEffect(() => {
    if (activeModal === 'chat') {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, activeModal]);

  const sendMessage = (textOverride) => {
    const question = (textOverride || input).trim();
    if (!question || chatLoading) return;
    setInput('');
    setChatLoading(true);
    setIsTyping(true);
    const userMsg = { id: Date.now(), role: 'user', text: question };
    setMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      const answer = findAnswer(question);
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', text: answer }]);
      setChatLoading(false);
      setIsTyping(false);
    }, 600 + Math.random() * 500);
  };

  // Close modals on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setActiveModal(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Global event listener to open modals properly (so JavaCourse can trigger them)
  useEffect(() => {
    const handleOpenModal = (e) => {
      if (e.detail?.modal) {
        setActiveModal(e.detail.modal);
      }
    };
    window.addEventListener('open-side-modal', handleOpenModal);
    return () => window.removeEventListener('open-side-modal', handleOpenModal);
  }, []);

  return (
    <>
      {/* ── Floating Action Buttons (FABs) ── */}
      <div className="fixed right-4 md:right-6 bottom-[104px] flex flex-col gap-4 z-40">

        {/* Videos Floating Button */}
        <motion.button
          whileHover={{ scale: 1.1, x: -5 }} whileTap={{ scale: 0.9 }}
          onClick={() => setActiveModal(activeModal === 'youtube' ? null : 'youtube')}
          className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center border border-white/20 relative group"
          style={{ background: 'linear-gradient(135deg,#ef4444,#b91c1c)' }}
          title="Watch Videos"
        >
          <Youtube size={24} className="text-white" />

          {/* Tooltip */}
          <div className="absolute right-16 px-3 py-1.5 bg-black/80 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Videos
          </div>
        </motion.button>

        {/* Chatbot Floating Button */}
        <motion.button
          whileHover={{ scale: 1.1, x: -5 }} whileTap={{ scale: 0.9 }}
          onClick={() => setActiveModal(activeModal === 'chat' ? null : 'chat')}
          className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center border border-white/20 relative group"
          style={{ background: 'linear-gradient(135deg,#10b981,#047857)' }}
          title="AI Tutor"
        >
          <img src="/robot.png" alt="AI Robot" className="w-14 h-14 object-cover rounded-full" />

          {/* Notification Dot */}
          <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2 }}
            className="absolute top-0 right-0.5 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-[#05091a]" />

          {/* Tooltip */}
          <div className="absolute right-16 px-3 py-1.5 bg-black/80 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
            AI Tutor
          </div>
        </motion.button>

      </div>

      {/* ── Modals Area ── */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-4 md:right-24 bottom-24 z-50 w-[calc(100vw-32px)] md:w-96 rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-white/10"
            style={{
              height: '500px',
              maxHeight: '75vh',
              background: 'rgba(15, 23, 42, 0.98)',
              backdropFilter: 'blur(16px)'
            }}
          >
            {/* ─── CHAT MODAL ─── */}
            {activeModal === 'chat' && (
              <>
                <div className="flex-shrink-0 p-3 border-b border-indigo-500/30 flex items-center justify-between" style={{ background: 'linear-gradient(135deg,#10b981,#047857)' }}>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
                      <img src="/robot.png" alt="Robot" className="w-8 h-8 object-cover rounded-full" />
                    </div>
                    <div>
                      <h3 className="font-black text-white text-sm leading-tight">Python AI Tutor</h3>
                      <p className="text-[10px] text-emerald-100 uppercase tracking-widest font-bold">Online</p>
                    </div>
                  </div>
                  <button onClick={() => setActiveModal(null)} className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors">
                    <X size={16} className="text-white" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3" style={{ background: 'rgba(0,0,0,0.2)' }}>
                  {messages.map(msg => (
                    <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-sm
                        ${msg.role === 'bot' ? 'shadow-sm text-white' : 'bg-emerald-950/50 border border-emerald-500/30'}`}
                        style={msg.role === 'bot' ? { background: 'linear-gradient(135deg,#10b981,#047857)' } : {}}>
                        {msg.role === 'bot' ? <img src="/robot.png" alt="Bot" className="w-7 h-7 object-cover rounded-full" /> : <User size={13} className="text-emerald-400" />}
                      </div>
                      <div
                        className={`max-w-[83%] px-3 py-2.5 rounded-2xl text-xs leading-relaxed shadow-lg ${msg.role === 'user'
                          ? 'bg-emerald-600 text-white rounded-tr-sm'
                          : 'bg-slate-800 text-slate-100 border border-white/5 rounded-tl-sm'
                          }`}
                        dangerouslySetInnerHTML={{ __html: msg.role === 'bot' ? formatMessage(msg.text) : msg.text }}
                      />
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white shadow-sm"
                        style={{ background: 'linear-gradient(135deg,#10b981,#047857)' }}><img src="/robot.png" alt="Bot" className="w-7 h-7 object-cover rounded-full" /></div>
                      <div className="bg-slate-800 border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center shadow-lg">
                        {[0, 1, 2].map(i => (
                          <motion.div key={i} animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.55, delay: i * 0.13 }}
                            className="w-2 h-2 bg-emerald-500 rounded-full" />
                        ))}
                      </div>
                    </motion.div>
                  )}
                  <div ref={bottomRef} className="h-1" />
                </div>

                <div className="flex-shrink-0 px-3 py-2 flex gap-2 overflow-x-auto bg-slate-900/50 border-t border-white/5" style={{ scrollbarWidth: 'none' }}>
                  {['What is Python?', 'Explain operators', 'What is OOP?', 'How loops work?', 'Python Lists'].map(s => (
                    <button key={s} onClick={() => sendMessage(s)} disabled={chatLoading}
                      className="flex-shrink-0 text-[10px] px-3 py-1.5 bg-emerald-950/40 text-emerald-300 rounded-full border border-emerald-500/30 font-bold hover:bg-emerald-600 hover:text-white transition-all whitespace-nowrap disabled:opacity-40">
                      {s}
                    </button>
                  ))}
                </div>

                <div className="flex-shrink-0 border-t border-white/5 bg-slate-900/80 p-3">
                  <div className="flex gap-2">
                    <input
                      ref={chatInputRef}
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter' && !chatLoading) sendMessage(); }}
                      placeholder="Ask AI Tutor..."
                      disabled={chatLoading}
                      className="flex-1 px-4 py-2.5 rounded-2xl border border-white/10 focus:outline-none focus:border-emerald-500/50 text-xs bg-black/40 text-slate-100 placeholder:text-slate-500 disabled:opacity-60"
                    />
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={() => sendMessage()} disabled={!input.trim() || chatLoading}
                      className="w-10 h-10 rounded-2xl flex items-center justify-center disabled:opacity-40 flex-shrink-0 shadow-lg"
                      style={{ background: 'linear-gradient(135deg,#10b981,#047857)' }}>
                      <Send size={15} className="text-white" />
                    </motion.button>
                  </div>
                </div>
              </>
            )}

            {/* ─── YOUTUBE MODAL ─── */}
            {activeModal === 'youtube' && (
              <>
                <div className="flex-shrink-0 p-3 border-b border-red-500/30 flex items-center justify-between" style={{ background: 'linear-gradient(135deg,#ef4444,#b91c1c)' }}>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
                      <Youtube size={16} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-black text-white text-sm leading-tight">Video Tutorials</h3>
                      <p className="text-[10px] text-red-100 uppercase tracking-widest font-bold">Coding Boss Masterclass</p>
                    </div>
                  </div>
                  <button onClick={() => setActiveModal(null)} className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors">
                    <X size={16} className="text-white" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: 'rgba(0,0,0,0.2)' }}>
                  <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700 text-center mb-4">
                    <span className="text-2xl mb-1 block">🎓</span>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed">
                      Deepen your knowledge with complete video tutorials from the <strong>Coding Boss Masterclass</strong> channel.
                    </p>
                  </div>

                  {YOUTUBE_RESOURCES.map((res, i) => (
                    <motion.a key={i} href={res.url} target={res.isLocked ? undefined : "_blank"} rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.02, x: 3 }}
                      onClick={(e) => {
                        if (res.isLocked) {
                          e.preventDefault();
                          alert("Please pay or subscribe to the account to unlock this video!");
                        }
                      }}
                      className={`flex items-center gap-3 p-4 rounded-2xl border-2 ${res.color} cursor-pointer group shadow-sm bg-white/95`}>
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-2xl shadow-sm border border-slate-100 flex-shrink-0">
                        {res.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-black text-sm leading-tight truncate mb-1">
                          {res.topic}
                          {res.isLocked && <Lock size={14} className="inline ml-2 text-red-500 mb-1" />}
                        </h3>
                        <p className="text-[10px] opacity-70 font-semibold mb-1 flex items-center gap-1"><Youtube size={10} className="inline text-red-500" /> {res.channel}</p>
                        <span className="text-[9px] uppercase tracking-wider font-bold opacity-60 bg-black/5 px-2 py-0.5 rounded text-black">{res.level}</span>
                      </div>
                      {!res.isLocked && <ExternalLink size={14} className="opacity-40 group-hover:opacity-80 flex-shrink-0" />}
                    </motion.a>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
