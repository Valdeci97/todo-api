"use strict";

var _TaskService = _interopRequireDefault(require("../../services/TaskService"));
var _MockTaskModel = _interopRequireDefault(require("../mocks/MockTaskModel"));
var _tasks = require("../mocks/tasks");
var _HttpException = _interopRequireDefault(require("../../exceptions/HttpException"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let mockTaskModel;
let taskService;
describe('Testing task service methods', () => {
  beforeEach(() => {
    mockTaskModel = new _MockTaskModel.default();
    taskService = new _TaskService.default(mockTaskModel);
  });
  describe('Creating task', () => {
    it('should be able to create a new task', async () => {
      const createdTask = await taskService.create(_tasks.task);
      expect(createdTask).toHaveProperty('id');
      expect(createdTask).toHaveProperty('createdAt');
    });
    it('should not be able to create two tasks with same date by same user', async () => {
      await taskService.create(_tasks.task);
      expect(taskService.create(_tasks.task)).rejects.toBeInstanceOf(_HttpException.default);
    });
  });
  describe('Reading tasks', () => {
    it('should return all taks', async () => {
      await taskService.create(_tasks.task);
      const tasks = await taskService.read(_tasks.task.userId);
      expect(Array.isArray(tasks)).toBe(true);
      expect(tasks).toHaveLength(1);
    });
  });
  describe('Reading task by id', () => {
    it('should return a task', async () => {
      const createdTask = await taskService.create(_tasks.task);
      const dbTask = await taskService.readOne(createdTask.id);
      expect(dbTask).toHaveProperty('id');
      expect(dbTask.id).toEqual(createdTask.id);
    });
    it('should throw an HttpException', async () => {
      expect(taskService.readOne('4')).rejects.toBeInstanceOf(_HttpException.default);
    });
  });
  describe('Updating task', () => {
    it('should return a task with new information', async () => {
      const createdTask = await taskService.create(_tasks.task);
      const id = createdTask.id;
      const updatedTask = await taskService.update(id, _tasks.taskToUpdate);
      expect(updatedTask.when).not.toEqual(createdTask.when);
      expect(updatedTask.when).toBe('2022-12-15T22:30:00.000Z');
    });
    it('should throw an HttpException', async () => {
      expect(taskService.update('4', _tasks.taskToUpdate)).rejects.toBeInstanceOf(_HttpException.default);
    });
  });
  describe('Deleting a task', () => {
    it('should remove a task from database', async () => {
      const createdTask = await taskService.create(_tasks.task);
      const deletedTask = await taskService.delete(createdTask.id);
      expect(deletedTask).toBeUndefined();
      const tasks = await taskService.read(_tasks.task.userId);
      expect(tasks).toHaveLength(0);
    });
    it('should throw an HttpException', async () => {
      expect(taskService.delete('4')).rejects.toBeInstanceOf(_HttpException.default);
    });
  });
});