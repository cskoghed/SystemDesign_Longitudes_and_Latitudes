const createNamedCounter = (name) => {
    return {
        name,
        count: 0
    }
}

//undo/redo command structure as demonstrated in inrementator
//-----------
const createIncrementCommand = (counter) => {
    const previousCount = counter.count;

    return {
        execute() {
            counter.count += 1;
        },

        undo() {
            counter.count = previousCount;
        }
    }
}

const createDecrementCommand = (counter) => {
    const previousCount = counter.count;

    return {
        execute() {
            counter.count -= 1;
        },

        undo() {
            counter.count = previousCount;
        }
    }
}
//---------..



//Managed commands
//---------
const INCREMENT = "INCREMENT"
const DECREMENT = "DECREMENT"

const commands = {
    [INCREMENT]: createIncrementCommand,
    [DECREMENT]: createDecrementCommand
}
//---------

const createCommandManager = (target) => {
    let history = [null];
    let position = 0;

    return {
        doCommand(commandType) {
            if (position < history.length -1) {
                history = history.slice(0, position + 1)
            }

            if (commands[commandType]) {
                const concreteCommand = commands[commandType](target);
                history.push(concreteCommand);
                position += 1;

                concreteCommand.execute();
            }
        },

        undo() {
            if (position > 0) {
                history[position].undo();
                position -= 1;
            }
        },

        redo() {
            if(position < history.length -1) {
                position += 1;
                history[position].execute();
            }
        }
    }
}
