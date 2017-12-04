use strict;
use warnings;
use Data::Dumper;

my @aLines = ();
open(my $fh, '<', 'input.txt');
while(defined(my $sLine = <$fh>)) {
  chomp($sLine);
  push(@aLines, $sLine);
}
close($fh);

my @aGrid = ([]);
my @aNextGrid = ([]);

sub one {

  my $sNumberOfIterations = shift @_;
  for (my $i = 0; $i < $sNumberOfIterations; $i++) {
    undef @aNextGrid;

    iterate(0);
    @aGrid = @aNextGrid;
  }

  return countLights();
}

sub two {
  my $sNumberOfIterations = shift @_;
  undef(@aGrid);
  parse();
  breakLights();

  for (my $i = 0; $i < $sNumberOfIterations; $i++) {
    undef @aNextGrid;

    iterate(1);
    @aGrid = @aNextGrid;
  }

  return countLights();
}

sub parse {
  for (my $i = 0; $i < scalar(@aLines); $i++) {
    my $sLine = $aLines[$i];
    for (my $j = 0; $j < length($sLine); $j++) {
      my $sChar = substr($sLine, $j, 1);

      $aGrid[$i][$j] = ($sChar eq '#') ? 1 : 0;
    }
  }
}

sub iterate {
  my $sBroken = shift @_;

  for (my $i = 0; $i < scalar(@aGrid); $i++) {
    my @aRow = @{$aGrid[$i]};

    for (my $j = 0; $j < scalar(@aRow); $j++) {
      my $sCell = $aRow[$j];

      $aNextGrid[$i][$j] = newState($i, $j, $sCell, $sBroken);
    }
  }
}

sub newState {
  my $i = shift @_;
  my $j = shift @_;
  my $sState = shift @_;
  my $sBroken = shift @_;

  my $sCount = 0;

  if ($sBroken) {
    if (($i == 0 && $j == 0) ||
        ($i == 0 && $j == scalar(@{$aGrid[$i]})-1) ||
        ($i == scalar(@aGrid)-1 && $j == 0) ||
        ($i == scalar(@aGrid)-1 && $j == scalar(@{$aGrid[$i]})-1)) {
      return 1;
    }

  }

  # Check row above
  if($i > 0) {
    $sCount += $aGrid[$i-1][$j-1] if($j > 0);
    $sCount += $aGrid[$i-1][$j];
    $sCount += $aGrid[$i-1][$j+1] if($j < scalar(@{$aGrid[$i-1]})-1);
  }

  # Check current row
  $sCount += $aGrid[$i][$j-1] if($j > 0);
  $sCount += $aGrid[$i][$j+1] if($j < scalar(@{$aGrid[$i]})-1);

  # Check row below
  if($i < scalar(@aGrid)-1) {
    $sCount += $aGrid[$i+1][$j-1] if($j > 0);
    $sCount += $aGrid[$i+1][$j];
    $sCount += $aGrid[$i+1][$j+1] if($j < scalar(@{$aGrid[$i+1]})-1);
  }

  if ($sState) {
    return ($sCount == 2 || $sCount == 3) ? 1 : 0;
  }

  return ($sCount == 3) ? 1 : 0;
}

sub countLights {
  my $sCount = 0;

  for (my $i = 0; $i < scalar(@aGrid); $i++) {
    for (my $j = 0; $j < scalar(@{$aGrid[$i]}); $j++) {
      $sCount += $aGrid[$i][$j];
    }
  }

  return $sCount;
}

sub breakLights {
  my $sMaxI = scalar(@aGrid)-1;
  my $sMaxJ = scalar(@{$aGrid[0]})-1;

  $aGrid[0][0] = 1;
  $aGrid[0][$sMaxJ] = 1;
  $aGrid[$sMaxI][0] = 1;
  $aGrid[$sMaxI][$sMaxJ] = 1;
}

parse();
print "Solution one is: " . one(100) . "\n";
print "Solution two is: " . two(100) . "\n";
