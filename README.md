# Project Gutenberg explorer

### **Overview**

Project Gutenberg ****is a platform to download and access free e-books. We're looking to build a web application that allows users to explore and analyze books from Project Gutenberg.

### API Access
E-book content and metadata can be programmatically fetched via Project Gutenberg

```py
content_url = f"https://www.gutenberg.org/files/{book_id}/{book_id}-0.txt"
metadata_url = f"https://www.gutenberg.org/ebooks/{book_id}"

# Get book content
content_response = requests.get(content_url)
content = content_response.text

# Get metadata
metadata_response = requests.get(metadata_url)
```

### **Requirements**

**⚙️ Core Functionality** 

- [] Input field for users to enter a Project Gutenberg book ID.
- [] Fetch and display the book's text and metadata.
- [] Save the book text and metadata for future access.
- [] Provide a list view of all books the user has previously accessed.

🧠 **Text Analysis**

Given the text the user should be able to perform text analysis. You are free to choose what analysis you find most interesting but some could be:

- [] Identify key characters
- [] Language Detection
- [] Sentiment Analysis
- [] Plot Summary
- [] Something else?

💅 **Styling**

Style it as you see fit. We personally really like tailwind and Shadcn.

👨‍💻  **Deliverables**

- [] Deploy the application to the internet
- [] Integrate an LLM for text analysis (you have flexibility in choosing the specific model).
- [] Store source code in Github
- [] Create a loom that walks a user through the application and explains any technical choices