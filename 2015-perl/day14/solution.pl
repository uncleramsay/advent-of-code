use strict;
use warnings;
use POSIX qw(floor);
use List::Util qw(min);
use Data::Dumper;

my @aLines = ();
open(my $fh, '<', 'input.txt');
while(defined(my $sLine = <$fh>)) {
  chomp($sLine);
  push(@aLines, $sLine);
}
close($fh);

my $sTime = 2503;
my @aReindeer = ();
my %hPoints = ();

sub one {
  my $sMaxDistance = 0;

  my %hReindeerDistances = calculateDistances($sTime);
  foreach my $sReindeer (keys %hReindeerDistances) {
    if ($hReindeerDistances{$sReindeer} > $sMaxDistance) {
      $sMaxDistance = $hReindeerDistances{$sReindeer};
    }
  }

  return $sMaxDistance;
}

sub two {
  for (my $i = 1; $i <= $sTime; $i++) {
    my %hReindeerDistances = calculateDistances($i);

    my $sMaxDistance;
    foreach my $sReindeer (sort {$hReindeerDistances{$b} <=> $hReindeerDistances{$a}} keys %hReindeerDistances) {
      if(!defined($sMaxDistance) || $hReindeerDistances{$sReindeer} == $sMaxDistance) {
        $sMaxDistance = $hReindeerDistances{$sReindeer};
        $hPoints{$sReindeer}++;
      }
    }
  }

  my @aSortedPoints = (sort {$b <=> $a} values %hPoints);
  return $aSortedPoints[0];
}

sub parse {
  foreach my $sLine (@aLines) {

    my ($sName, $sSpeed, $sFlyTime, $sRestTime) = $sLine =~ /^(\w+) can fly (\d+) km\/s for (\d+) .* (\d+) seconds\.$/;
    push(@aReindeer, {
      'name' => $sName,
      'speed' => $sSpeed,
      'flytime' => $sFlyTime,
      'resttime' => $sRestTime
    });

    $hPoints{$sName} = 0;
  }
}

sub calculateDistances {
  my $sTime = shift @_;

  my %hReindeerDistances = ();

  foreach my $rReindeer (@aReindeer) {
    my %hReindeer = %{$rReindeer};

    my $sIterationTime = $hReindeer{'flytime'} + $hReindeer{'resttime'};
    my $sIterationDistance = $hReindeer{'flytime'} * $hReindeer{'speed'};
    my $sNumberOfCompleteIterations = floor($sTime / $sIterationTime);
    my $sRemainingFlightSeconds = min($sTime % $sIterationTime, $hReindeer{'flytime'});
    my $sTotalDistance = ($sNumberOfCompleteIterations * $sIterationDistance) + ($sRemainingFlightSeconds * $hReindeer{'speed'});

    $hReindeerDistances{$hReindeer{'name'}} = $sTotalDistance;
  }

  return %hReindeerDistances;
}

parse();
print "Solution one is: " . one() . "\n";
print "Solution two is: " . two() . "\n";
