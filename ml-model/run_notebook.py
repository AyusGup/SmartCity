from nbformat import read, write
from nbconvert.preprocessors import ExecutePreprocessor

def execute_notebook(mapping_Notebook):
    with open("mapping_Notebook.ipynb", 'r', encoding='utf-8') as notebook_file:
        notebook_content = read(notebook_file, as_version=4)

    execute_preprocessor = ExecutePreprocessor(timeout=600, kernel_name='python3')

    execute_preprocessor.preprocess(notebook_content, {'metadata': {'path': './'}})

    with open(notebook_path, 'w', encoding='utf-8') as notebook_file:
        write(notebook_content, notebook_file)

if __name__ == '__main__':
    notebook_path = 'mapping_Notebook'
    execute_notebook(notebook_path)
