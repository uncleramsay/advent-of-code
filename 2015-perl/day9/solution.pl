use strict;
use warnings;
use Algorithm::Permute;
use Data::Dumper;

my @aLines = ();
open(my $fh, '<', 'input.txt');
while(defined(my $sLine = <$fh>)) {
  chomp($sLine);
  push(@aLines, $sLine);
}
close($fh);

my %hDistanceMap = ();
my @aLocations = ();
my $sShortestDistance;
my $sLongestDistance;

sub one {
  return $sShortestDistance;
}

sub two {
  return $sLongestDistance;
}

sub init {
  foreach my $sLine (@aLines) {
    my ($sStart, $sEnd, $sDistance) = $sLine =~ /^(\w+) to (\w+) = (\d+)$/;
    $hDistanceMap{$sStart}{$sEnd} = $sDistance;
    $hDistanceMap{$sEnd}{$sStart} = $sDistance;
  }

  @aLocations = keys %hDistanceMap;
}

sub compute {
  my @aShortestRoute;
  my @aLongestRoute;
  my $oIterator = Algorithm::Permute->new(\@aLocations);

  my $sCount = 0;
  while(my @aPerm = $oIterator->next) {

    my $sDistance = 0;
    for(my $i = 0; $i < scalar(@aPerm)-1; $i++) {
      $sDistance += $hDistanceMap{$aPerm[$i]}{$aPerm[$i+1]};
    }

    if (!defined($sShortestDistance) || $sDistance < $sShortestDistance) {
      $sShortestDistance = $sDistance;
      @aShortestRoute = @aPerm;
    }

    if(!defined($sLongestDistance) || $sDistance > $sLongestDistance) {
      $sLongestDistance = $sDistance;
      @aLongestRoute = @aPerm;
    }

    print "Tested $sCount permutations. Currently, shortest = $sShortestDistance, longest = $sLongestDistance\n";
    $sCount++;
  }

  print "\n\nShortest route: @aShortestRoute\n";
  print "Longest route: @aLongestRoute\n";
}

init();
compute();
print "Solution one is: " . one() . "\n";
print "Solution two is: " . two() . "\n";
