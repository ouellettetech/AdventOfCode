import re

class cutSquare:
  def __init__(self, idOrString, xPos = None, yPos = None, width = None, height = None):
    if height is None: # if anything less than full parms assume just passing string
      matchObj = re.match( r'#([0-9]*) @ ([0-9]*),([0-9]*): ([0-9]*)x([0-9]*)', idOrString, re.M|re.I)
      idOrString = matchObj.group(1)
      xPos = matchObj.group(2)
      yPos = matchObj.group(3)
      width = matchObj.group(4)
      height = matchObj.group(5)
    self.xPos = int(xPos)
    self.yPos = int(yPos)
    self.width = int(width)
    self.height = int(height)
    self.id = idOrString
  def printme(self):
      print('ID: {0} {1}:{2} Size: {3} {4}'.format(self.id, self.xPos, self.yPos, self.width, self.height))
  def cut(self, fabric):
    for i in range(self.xPos, self.width + self.xPos):
      for j in range(self.yPos, self.height + self.yPos):
          fabric[i][j] += 1
  def checkIfCutAlready(self, fabric):
    dup = False
    for i in range(self.xPos, self.width + self.xPos):
      for j in range(self.yPos, self.height + self.yPos):
          if( fabric[i][j] > 1):
              dup = True
              break
    return dup

#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2

sq1 = cutSquare("1", 1, 3, 4, 4)
sq1.printme()
sq2 = cutSquare("2", 3, 1, 4, 4)
sq2.printme()
sq3 = cutSquare("3", 5, 5, 2, 2)
sq3.printme()
sq4 = cutSquare("#938 @ 168,524: 17x20")
sq4.printme()

print(sq1.xPos)
print(sq1.yPos)

file = open("day3Input.txt", "r")
cutList = []
for line in file:
  curCut = cutSquare(line)
  cutList.append(curCut)
  curCut.printme()

# Could solve part A multiple ways, and optomize for the size of the cuts, size of the list of cuts or the size of the original cloth.
# Either create a 1000x1000 array, and mark it for each cut, and then count the squares cut at least twice. (this would be max of 1000x1000xlistLength)+1000x1000
# Compare every combination of cuts to find overlap, (really bad, ListLength*ListLength)
# or check on every square if its in any of the Cuts twice, again 1000x1000xListLength, though only have to go through each Fabric grid space once.
# going with solution one since the problem looks like it wants that, one and part B might be faster with the grid already populated. (looks like he expects to have a grid)

fabric = [[0 for i in range(1000)] for j in range(1000)]
for curCut in cutList:
  curCut.cut(fabric)

doubleCutCount = 0
for i in range(1000):
  for j in range(1000):
      if(fabric[i][j]>=2):
          doubleCutCount += 1

print('PartA: {0} '.format(doubleCutCount))

# Would have been better to just compare them for the first example...
for curCut in cutList:
  duplicate = curCut.checkIfCutAlready(fabric)
  if not duplicate:
    print('PartB: {0}'.format(curCut.id))
    break

print('PartB Done')
