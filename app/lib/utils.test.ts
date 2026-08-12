import { filterAndSortTasks } from "./utils";
import { Task } from "./types";

// A simple test script for our utility function
// (Run with: npx tsx lib/utils.test.ts if tsx is installed, or adapt to vitest/jest)

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Buy groceries",
    status: "To Do",
    priority: "Medium",
    createdAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "2",
    title: "Pay bills",
    status: "In Progress",
    priority: "High",
    createdAt: "2023-01-02T00:00:00Z",
    dueDate: "2023-01-10T00:00:00Z",
  },
  {
    id: "3",
    title: "Walk the dog",
    status: "Done",
    priority: "Low",
    createdAt: "2023-01-03T00:00:00Z",
    dueDate: "2023-01-05T00:00:00Z",
  },
];

export function runTests() {
  console.log("Running tests for filterAndSortTasks...");
  let passed = 0;
  let total = 0;

  const assertEqual = (name: string, actual: unknown, expected: unknown) => {
    total++;
    if (JSON.stringify(actual) === JSON.stringify(expected)) {
      passed++;
      console.log(`✅ [PASS] ${name}`);
    } else {
      console.error(
        `❌ [FAIL] ${name}\nExpected: ${JSON.stringify(expected)}\nActual: ${JSON.stringify(actual)}`,
      );
    }
  };

  // Test 1: Filter by status
  const filtered = filterAndSortTasks(mockTasks, "", "In Progress", "newest");
  assertEqual('Filter by status "In Progress"', filtered.length, 1);
  assertEqual('Filter by status "In Progress" content', filtered[0].id, "2");

  // Test 2: Search by title
  const searched = filterAndSortTasks(mockTasks, "dog", "All", "newest");
  assertEqual('Search by title "dog"', searched.length, 1);
  assertEqual('Search by title "dog" content', searched[0].id, "3");

  // Test 3: Sort by Priority
  const sortedPriority = filterAndSortTasks(mockTasks, "", "All", "priority");
  assertEqual(
    "Sort by priority High -> Medium -> Low",
    sortedPriority.map((t) => t.id),
    ["2", "1", "3"],
  );

  console.log(`\nTest Summary: ${passed}/${total} passed.`);
}

// Automatically run if executed directly
if (typeof require !== "undefined" && require.main === module) {
  runTests();
}
