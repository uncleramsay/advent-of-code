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

my @aRoutes = ();

sub one {

  my $sTotal = shift @_;

  for(my $i = 0; $i < scalar(@aLines); $i++) {
    deepDive($i, $sTotal, '');
  }

  return scalar(@aRoutes);
}

sub two {
  my $sTotal = shift @_;

  for(my $i = 0; $i < scalar(@aLines); $i++) {
    deepDive($i, $sTotal, '');
  }

  my $sLowest;
  my $sCount;
  foreach my $sRoute (@aRoutes) {

    my @aParts = split('-', $sRoute);
    my $sLength = scalar(@aParts);

    if(!defined($sLowest) || $sLength < $sLowest) {
      $sLowest = $sLength;
      $sCount = 1; # Reset the count
    }
    elsif($sLength == $sLowest) {
      $sCount++;
    }
  }

  return $sCount;
}

sub deepDive {
  my $sIndex = shift @_;
  my $sRemaining = shift @_;
  my $sRoute = shift @_;

  if($aLines[$sIndex] <= $sRemaining) {
    $sRemaining -= $aLines[$sIndex];
    $sRoute .= "$sIndex-";
  }

  if($sRemaining == 0) {
    my $sPushRoute = substr($sRoute, 0, -1);

    if (!grep {$_ eq $sPushRoute} @aRoutes) {
      push(@aRoutes, $sPushRoute);
    }
  }

  for(my $i = $sIndex+1; $i < scalar(@aLines); $i++) {
    deepDive($i, $sRemaining, $sRoute);
  }
}

print "Solution one is: " . one(150) . "\n";
print "Solution two is: " . two(150) . "\n";
