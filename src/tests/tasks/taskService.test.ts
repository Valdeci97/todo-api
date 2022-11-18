import TaskService from '../../services/TaskService';
import MockTaskModel from '../mocks/MockTaskModel';
import { task, taskToUpdate } from '../mocks/tasks';
import HttpException from '../../exceptions/HttpException';

let mockTaskModel: MockTaskModel;
let taskService: TaskService;

describe('Testing task service methods', () => {
  beforeEach(() => {
    mockTaskModel = new MockTaskModel();
    taskService = new TaskService(mockTaskModel);
  });

  describe('Creating task', () => {
    it('should be able to create a new task', async () => {
      const createdTask = await taskService.create(task);

      expect(createdTask).toHaveProperty('id');
      expect(createdTask).toHaveProperty('createdAt');
    });

    it('should not be able to create two tasks with same date by same user', async () => {
      await taskService.create(task);
      expect(taskService.create(task)).rejects.toBeInstanceOf(HttpException);
    });
  });

  describe('Reading tasks', () => {
    it('should return all taks', async () => {
      await taskService.create(task);
      const tasks = await taskService.read(task.userId);

      expect(Array.isArray(tasks)).toBe(true);
      expect(tasks).toHaveLength(1);
    });
  });

  describe('Reading task by id', () => {
    it('should return a task', async () => {
      const createdTask = await taskService.create(task);
      const dbTask = await taskService.readOne(createdTask.id as string);
      expect(dbTask).toHaveProperty('id');
      expect(dbTask.id).toEqual(createdTask.id);
    });

    it('should throw an HttpException', async () => {
      expect(taskService.readOne('4')).rejects.toBeInstanceOf(HttpException);
    });
  });

  describe('Updating task', () => {
    it('should return a task with new information', async () => {
      const createdTask = await taskService.create(task);
      const id = createdTask.id as string;
      const updatedTask = await taskService.update(id, taskToUpdate);

      expect(updatedTask.when).not.toEqual(createdTask.when);
      expect(updatedTask.when).toBe('2022-12-15T22:30:00.000Z');
    });

    it('should throw an HttpException', async () => {
      expect(taskService.update('4', taskToUpdate)).rejects.toBeInstanceOf(
        HttpException
      );
    });
  });

  describe('Deleting a task', () => {
    it('should remove a task from database', async () => {
      const createdTask = await taskService.create(task);
      const deletedTask = await taskService.delete(createdTask.id as string);

      expect(deletedTask).toBeUndefined();

      const tasks = await taskService.read(task.userId);

      expect(tasks).toHaveLength(0);
    });

    it('should throw an HttpException', async () => {
      expect(taskService.delete('4')).rejects.toBeInstanceOf(HttpException);
    });
  });
});
