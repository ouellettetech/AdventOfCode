import re
from datetime import date
from enum import Enum
from datetime import datetime, date, time
class LogType(Enum):
  Asleep = 1
  Begin = 2
  WakesUP = 3

#[1518-10-03 00:47] falls asleep
#[1518-07-26 23:50] Guard #487 begins shift
#[1518-06-22 00:48] wakes up


class LogEntry:
  def __init__(self, logString):   #"[1518-11-01 00:05] falls asleep"
    fallsAsleepLog = re.match( r'\[1518\-([0-9]*)\-([0-9]*) ([0-9]*):([0-9]*)\] falls asleep', logString, re.M|re.I)
    beginShiftLog = re.match( r'\[1518\-([0-9]*)\-([0-9]*) ([0-9]*):([0-9]*)\] Guard #([0-9]*) begins shift', logString, re.M|re.I)
    wakesUpLog = re.match( r'\[1518\-([0-9]*)\-([0-9]*) ([0-9]*):([0-9]*)\] wakes up', logString, re.M|re.I)
    logMatch = None
    self.guardID = None
    self.timeStamp = None
    self.type = None
    if fallsAsleepLog:
      logMatch = fallsAsleepLog
      self.type = LogType.Asleep
    if beginShiftLog:
      logMatch = beginShiftLog
      self.type = LogType.Begin
      self.guardID = int(beginShiftLog.group(5))
    if wakesUpLog:
      logMatch = wakesUpLog
      self.type = LogType.WakesUP
    if logMatch:
      Month = logMatch.group(1)
      Day = logMatch.group(2)
      Hour = logMatch.group(3)
      Minute = logMatch.group(4)
      d = date(1518, int(Month), int(Day))
      t = time(int(Hour), int(Minute))
      self.timeStamp = datetime.combine(d, t)
    else: 
      print('No Match!!!!')
  def printme(self):
    print('Log entry {0} Type: {1} Guard {2}'.format(self.timeStamp, self.type, self.guardID))
def sortDate(val): 
  return val.timeStamp

class SleepEntry:
  def __init__(self, startDate, endDate, guardID):
    self.startDate = startDate
    self.endDate = endDate
    self.guardID = guardID
  def printme(self):
     print('Guard {0} Was asleep from {1} to {2}'.format(self.guardID, self.startDate, self.endDate))
class GuardEntry:
  def __init__(self, guardID):
    self.guardID = guardID
    self.sleepLogs = []
    self.minutesAsleep = [0 for i in range(60)]
    self.totalMinutesSleep = 0
  def addSleepLog(self, sleepEntry):
    self.sleepLogs.append(sleepEntry)
    start = sleepEntry.startDate.minute
    end = sleepEntry.endDate.minute
    for i in range(start, end):
      self.minutesAsleep[i] += 1
      self.totalMinutesSleep += (end - start)
  def getTotalSleepTime(self):
    return self.totalMinutesSleep
  def getMaxSleepMinute(self):
    curMax = 0
    curMaxIndex = 0
    for i in range(0,60):
      if (self.minutesAsleep[i] > curMax ):
        curMax = self.minutesAsleep[i]
        curMaxIndex = i
    return curMaxIndex
  def getTimeCountOfMaxSleepMinute(self):
    curMax = 0
    for i in range(0,60):
      if (self.minutesAsleep[i] > curMax ):
        curMax = self.minutesAsleep[i]
    return curMax
  def printme(self):
    print('Guard {0} was asleep a total of {1} mins, the most at {2}'.format(self.guardID, self.getTotalSleepTime(), self.getMaxSleepMinute()))


testData = ["[1518-11-01 00:00] Guard #10 begins shift",
"[1518-11-01 00:05] falls asleep",
"[1518-11-01 00:25] wakes up",
"[1518-11-01 00:30] falls asleep",
"[1518-11-01 00:55] wakes up",
"[1518-11-05 00:03] Guard #99 begins shift",
"[1518-11-02 00:40] falls asleep",
"[1518-11-02 00:50] wakes up",
"[1518-11-03 00:05] Guard #10 begins shift",
"[1518-11-03 00:24] falls asleep",
"[1518-11-03 00:29] wakes up",
"[1518-11-04 00:02] Guard #99 begins shift",
"[1518-11-04 00:36] falls asleep",
"[1518-11-01 23:58] Guard #99 begins shift",
"[1518-11-04 00:46] wakes up",
"[1518-11-05 00:45] falls asleep",
"[1518-11-05 00:55] wakes up"]

def parseLogs(logStrings):
  plogs = []

  for curLog in logStrings:
    plogs.append(LogEntry(curLog))
  plogs.sort(key = sortDate)
  return plogs

def getSleepLogs(logs):
  sleepLogs = []
  curGuard = None
  curSleep = None
  for curLog in logs:
    if( curLog.type == LogType.Begin):
      curGuard = curLog.guardID
    if( curLog.type == LogType.Asleep):
      curSleep = curLog.timeStamp
    if( curLog.type == LogType.WakesUP):
      sleepLogs.append(SleepEntry(curSleep,curLog.timeStamp,curGuard))
  return sleepLogs

def getLogData(sleepLogs):
  guards = {}
  for curLog in sleepLogs:
    curGuard = None
    if curLog.guardID in guards:
      curGuard = guards[curLog.guardID]
    else:
      curGuard = GuardEntry(curLog.guardID)
      guards[curLog.guardID]=curGuard
    curGuard.addSleepLog(curLog)
  return guards

  
logs = parseLogs(testData)
for curLog in logs:
  curLog.printme()

sleepLogs = getSleepLogs(logs)
for curLog in sleepLogs:
  curLog.printme()

guards = getLogData(sleepLogs)
for curGuard in guards:
  guards[curGuard].printme()

print("Done Testing")
file = open("day4Input.txt", "r")
fileLogs = []
for line in file:
  fileLogs.append(line)
parsedlogs = parseLogs(fileLogs)
sleepingLogs = getSleepLogs(parsedlogs)
guards = getLogData(sleepingLogs)

maxGuardTime = 0
maxGuardID = 0
for curGuard in guards:
  if (guards[curGuard].getTotalSleepTime() > maxGuardTime):
    maxGuardID = curGuard
    maxGuardTime = guards[curGuard].getTotalSleepTime()

    print(maxGuardTime)

print('PartA: Guard: {0} slept for {1} mins result: {2} '.format(maxGuardID, guards[maxGuardID].getTotalSleepTime(), maxGuardID * guards[maxGuardID].getMaxSleepMinute()))

maxGuardTime = 0
maxGuardID = 0
for curGuard in guards:
  if (guards[curGuard].getTimeCountOfMaxSleepMinute() > maxGuardTime):
    maxGuardID = curGuard
    maxGuardTime = guards[curGuard].getTimeCountOfMaxSleepMinute()

timesAsleep = guards[maxGuardID].getTimeCountOfMaxSleepMinute()
maxMinuteAsleep = guards[maxGuardID].getMaxSleepMinute()
result = maxGuardID * guards[maxGuardID].getMaxSleepMinute()
print('PartA: Guard: {0} slept {1} times at {2} result: {3} '.format(maxGuardID, timesAsleep, maxMinuteAsleep, result))
