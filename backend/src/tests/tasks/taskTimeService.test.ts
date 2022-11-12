import TaskTimeService from '../../services/TaskTimeService';
import MockTaskTimeModel from '../mocks/MockTaskTimeModel';
import { task } from '../mocks/tasks';

let mockTaskModel: MockTaskTimeModel;
let taskTimeService: TaskTimeService;

describe('Testing task time service methods', () => {
  beforeEach(() => {
    mockTaskModel = new MockTaskTimeModel();
    taskTimeService = new TaskTimeService(mockTaskModel);
  });

  describe('Reading tasks by day', () => {
    it('should return an empty array', async () => {
      const tasksByDay = await taskTimeService.findByDay(task.userId);

      expect(Array.isArray(tasksByDay)).toBe(true);
      expect(tasksByDay).toHaveLength(0);
    });
  });

  describe('Reading tasks by week', () => {
    it('should return an empty array', async () => {
      const tasksByWeek = await taskTimeService.findByWeek(task.userId);

      expect(Array.isArray(tasksByWeek)).toBe(true);
      expect(tasksByWeek).toHaveLength(0);
    });
  });

  describe('Reading tasks by month', () => {
    it('should return an empty array', async () => {
      const tasksByMonth = await taskTimeService.findByMonth(task.userId);

      expect(Array.isArray(tasksByMonth)).toBe(true);
      expect(tasksByMonth).toHaveLength(0);
    });
  });

  describe('Reading tasks by Year', () => {
    it('should return an empty array', async () => {
      const tasksByYear = await taskTimeService.findByYear(task.userId);

      expect(Array.isArray(tasksByYear)).toBe(true);
      expect(tasksByYear).toHaveLength(0);
    });
  });

  describe('Reading late tasks', () => {
    it('should return an empty array', async () => {
      const lateTasks = await taskTimeService.findLate(task.userId);

      expect(Array.isArray(lateTasks)).toBe(true);
      expect(lateTasks).toHaveLength(0);
    });
  });
});
