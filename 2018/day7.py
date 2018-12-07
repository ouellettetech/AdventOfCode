import re
from enum import Enum

class Node:
  def __init__(self, name):
    self.id = name
    self.blocks = []
    self.depends = []
  def addBlocked(self, blockedNode):
    self.blocks.append(blockedNode)
    blockedNode.depends.append(self)
class Worker:
  def __init__(self, name):
    self.name = name
    self.currentTask = None
    self.currentTimeLeft = 0
  def addWork(self, taskName, baseTime):
    self.currentTask = taskName
    self.currentTimeLeft = baseTime + (ord(taskName) + 1 - ord('A'))
  def decrementTime(self):
    if(self.currentTimeLeft > 0):
      self.currentTimeLeft += -1
  def isIdle(self):
    return (self.currentTimeLeft == 0)
  def removeLastTask(self):
    tempTask = self.currentTask
    self.currentTask = None
    return tempTask


class InstructionOrderTree:
  def __init__(self):
    self.readyInstructions = []
    self.allNodes = {} # so I don't have to find a node in the tree
  def addDependency(self, firstName, secondName):
    firstNode = None
    secondNode = None
    if firstName in self.allNodes:
      firstNode = self.allNodes[firstName]
    else:
      firstNode = Node(firstName)
      self.allNodes[firstName] = firstNode
      self.readyInstructions.append(firstNode)
    if secondName in self.allNodes:
      secondNode = self.allNodes[secondName]
      if secondNode in self.readyInstructions:
        self.readyInstructions.remove(secondNode)
    else:
      secondNode = Node(secondName)
      self.allNodes[secondName] = secondNode
    firstNode.blocks.append(secondNode)
    secondNode.depends.append(firstNode)
  def isEmpty(self):
    return len(self.allNodes) == 0
  def getNextInstruction(self):
    def sortFunc(element):
      return element.id
    self.readyInstructions.sort(key = sortFunc)
    if(len(self.readyInstructions) == 0):
      return None
    else:
      nextInstruction = self.readyInstructions.pop(0)
      return nextInstruction.id
  def getNextInstructionAndUnblock(self):
    nextInstruction = self.getNextInstruction()
    self.finishTask(nextInstruction)
    return nextInstruction
  def finishTask(self, taskName):
    task = self.allNodes[taskName]
    del self.allNodes[taskName]
    for checkNode in task.blocks:
      checkNode.depends.remove(task)
      if len(checkNode.depends) == 0:
        self.readyInstructions.append(checkNode)

def getWorkTime(instructions, workers, baseTime):
  time = 0
  while not inst.isEmpty():
    for curWorker in workers:
      if curWorker.isIdle():
        lastTask = curWorker.removeLastTask()
        if(lastTask):
          inst.finishTask(lastTask)
    for curWorker in workers:
      if curWorker.isIdle():
        nextInst = inst.getNextInstruction()
        if( nextInst):
          curWorker.addWork(nextInst, baseTime)
    #for curWorker in workers:
    #  print('Time {0} Worker : {1} Working on {2}'.format(time, curWorker.name, curWorker.currentTask))
    time += 1
    for curWorker in workers:
      curWorker.decrementTime()
  return (time - 1) # I increment it one more time after its actually empty.

testInst=["Step C must be finished before step A can begin.",
"Step C must be finished before step F can begin.",
"Step A must be finished before step B can begin.",
"Step A must be finished before step D can begin.",
"Step B must be finished before step E can begin.",
"Step D must be finished before step E can begin.",
"Step F must be finished before step E can begin."]

inst = InstructionOrderTree()
for curInst in testInst:
  stepFormat = re.match( r'Step ([A-Z]) must be finished before step ([A-Z]) can begin.', curInst, re.M|re.I)
  firstStep = stepFormat.group(1)
  secondStep = stepFormat.group(2)
  inst.addDependency(firstStep,secondStep)

stepList = []
while not inst.isEmpty():
  stepList.append(inst.getNextInstructionAndUnblock())
  
print('Steps: {0}'.format("".join(stepList)))

inst = InstructionOrderTree()
for curInst in testInst:
  stepFormat = re.match( r'Step ([A-Z]) must be finished before step ([A-Z]) can begin.', curInst, re.M|re.I)
  firstStep = stepFormat.group(1)
  secondStep = stepFormat.group(2)
  inst.addDependency(firstStep,secondStep)

workers = []
workers.append(Worker("1"))
workers.append(Worker("2"))

time = getWorkTime(inst, workers, 0)

print ('Took {0} seconds with two workers'.format(time))
print("Done Testing")
file = open("day7Input.txt", "r")

inst = InstructionOrderTree()

for line in file:
  stepFormat = re.match( r'Step ([A-Z]) must be finished before step ([A-Z]) can begin.', line, re.M|re.I)
  firstStep = stepFormat.group(1)
  secondStep = stepFormat.group(2)
  inst.addDependency(firstStep,secondStep)


stepList = []
while not inst.isEmpty():
  stepList.append(inst.getNextInstructionAndUnblock())

print('PartA: Instruction Order: {0}'.format("".join(stepList)))

inst = InstructionOrderTree()

file = open("day7Input.txt", "r")
for line in file:
  stepFormat = re.match( r'Step ([A-Z]) must be finished before step ([A-Z]) can begin.', line, re.M|re.I)
  firstStep = stepFormat.group(1)
  secondStep = stepFormat.group(2)
  inst.addDependency(firstStep,secondStep)

workers = []
workers.append(Worker("1"))
workers.append(Worker("2"))
workers.append(Worker("3"))
workers.append(Worker("4"))
workers.append(Worker("5"))

time = getWorkTime(inst, workers, 60)
print ('PartB: Took {0} seconds with five workers'.format(time))
