#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import * as Task from './App.logic.js';

yargs(hideBin(process.argv))
    .command(
    'add <task>',
    'Add a new task',
    (yargs) => {
        return yargs.positional('task', {
        describe: 'The content of the task',
        type: 'string',
        });
    },
    (argv) => {
        Task.addTask(argv.task);
    }
    )

    .command(
    'update <id> <task>',
    'Update an existing task',
    (yargs) => {
        return yargs
        .positional('id', { describe: 'ID of the task to update', type: 'number' })
        .positional('task', { describe: 'The new content for the task', type: 'string' });
    },
    (argv) => {
        Task.updateTask(argv.id, argv.task);
    }
    )
    .command(
    'delete <id>',
    'Delete a task',
    (yargs) => {
        return yargs.positional('id', { describe: 'ID of the task to delete', type: 'number' });
    },
    (argv) => {
        Task.deleteTask(argv.id);
    }
    )
    .command(
    'mark-in-progress <id>',
    'Mark a task as in-progress',
    (yargs) => {
        return yargs.positional('id', { describe: 'ID of the task to mark', type: 'number' });
    },
    (argv) => {
        Task.markTask(argv.id, 'in-progress');
    }
    )
    .command(
    'mark-done <id>',
    'Mark a task as done',
    (yargs) => {
        return yargs.positional('id', { describe: 'ID of the task to mark', type: 'number' });
    },
    (argv) => {
        Task.markTask(argv.id, 'done');
    }
    )
    .command(
    'list [status]',
    'List tasks, optionally filtering by status (todo, in-progress, done)',
    (yargs) => {
        return yargs.positional('status', {
        describe: 'The status to filter by',
        type: 'string',
        choices: ['todo', 'in-progress', 'done'],
        });
    },
    (argv) => {
        argv.status ? Task.listTasksByStatus(argv.status) : Task.listAllTasks();
    }
    )
    .demandCommand(1, 'You need to provide a command.')
    .strict()
    .help().argv;
