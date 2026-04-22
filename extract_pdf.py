import sys
import os
sys.path.append('lib')
from PyPDF2 import PdfReader

files = [
    'Pitagoras-cuadernillo.pdf',
    '01.-Teorema-de-tales.pdf',
    'teorema-tales.pdf',
    'a010-jerarquia.pdf'
]

output = ""

for f in files:
    try:
        reader = PdfReader(f)
        output += f"\n\n# FILE: {f}\n"
        for i, page in enumerate(reader.pages):
            output += f"\n## PAGE {i+1}\n"
            output += page.extract_text()
    except Exception as e:
        output += f"\nERROR ON {f}: {str(e)}\n"

with open('extracted_exercises.txt', 'w') as out:
    out.write(output)
