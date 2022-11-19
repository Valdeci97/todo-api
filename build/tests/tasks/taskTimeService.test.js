"use strict";

var _TaskTimeService = _interopRequireDefault(require("../../services/TaskTimeService"));
var _MockTaskTimeModel = _interopRequireDefault(require("../mocks/MockTaskTimeModel"));
var _tasks = require("../mocks/tasks");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let mockTaskModel;
let taskTimeService;
describe('Testing task time service methods', () => {
  beforeEach(() => {
    mockTaskModel = new _MockTaskTimeModel.default();
    taskTimeService = new _TaskTimeService.default(mockTaskModel);
  });
  describe('Reading tasks by day', () => {
    it('should return an empty array', async () => {
      const tasksByDay = await taskTimeService.findByDay(_tasks.task.userId);
      expect(Array.isArray(tasksByDay)).toBe(true);
      expect(tasksByDay).toHaveLength(0);
    });
  });
  describe('Reading tasks by week', () => {
    it('should return an empty array', async () => {
      const tasksByWeek = await taskTimeService.findByWeek(_tasks.task.userId);
      expect(Array.isArray(tasksByWeek)).toBe(true);
      expect(tasksByWeek).toHaveLength(0);
    });
  });
  describe('Reading tasks by month', () => {
    it('should return an empty array', async () => {
      const tasksByMonth = await taskTimeService.findByMonth(_tasks.task.userId);
      expect(Array.isArray(tasksByMonth)).toBe(true);
      expect(tasksByMonth).toHaveLength(0);
    });
  });
  describe('Reading tasks by Year', () => {
    it('should return an empty array', async () => {
      const tasksByYear = await taskTimeService.findByYear(_tasks.task.userId);
      expect(Array.isArray(tasksByYear)).toBe(true);
      expect(tasksByYear).toHaveLength(0);
    });
  });
  describe('Reading late tasks', () => {
    it('should return an empty array', async () => {
      const lateTasks = await taskTimeService.findLate(_tasks.task.userId);
      expect(Array.isArray(lateTasks)).toBe(true);
      expect(lateTasks).toHaveLength(0);
    });
  });
});