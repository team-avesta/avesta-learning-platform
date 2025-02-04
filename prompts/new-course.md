# Adding a New Course

## 1. Course Structure

-   Create new JSON file in `public/mock/` for the new course structure (similar to oops-course-structure.json)
-   Add corresponding markdown files in `public/markdown/` for:
    -   Lesson content
    -   Exercise descriptions
    -   Exercise solutions

## 2. Code Changes

-   Update routing in `App.js` to handle the new course
-   Modify `CourseArea.js` to load the new course structure
-   Update navigation in `CollapsibleMenu.js` to include the new course

## 3. Content Requirements

-   Course structure JSON with modules and lessons
-   Markdown files for each lesson
-   Exercise descriptions and solutions
-   Any diagrams or visual aids

## 4. Optional Enhancements

-   Course-specific styling or themes
-   Custom diagram templates for exercises
-   Course-specific validation rules for exercises
