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

my %hHappinessMap = ();
my @aGuests = ();

sub one {
  parse();

  my $sHighestHappiness = 0;

  my $oIterator = Algorithm::Permute->new(\@aGuests);
  while(my @aPerm = $oIterator->next) {

    my $sTotal = 0;
    for(my $i = 0; $i < scalar(@aPerm); $i++) {

      my $sLeftIndex = ($i == 0) ? scalar(@aPerm)-1 : $i-1;
      my $sRightIndex = ($i == scalar(@aPerm)-1) ? 0 : $i+1;

      $sTotal += $hHappinessMap{$aPerm[$i]}{$aPerm[$sLeftIndex]};
      $sTotal += $hHappinessMap{$aPerm[$i]}{$aPerm[$sRightIndex]};
    }

    if($sTotal > $sHighestHappiness) {
      $sHighestHappiness = $sTotal;
    }
  }

  return $sHighestHappiness;
}

sub two {
  parse();
  foreach my $sGuest (@aGuests) {
    push(@aLines, "Santa would gain 0 happiness units by sitting next to $sGuest.");
    push(@aLines, "$sGuest would gain 0 happiness units by sitting next to Santa.");
  }
  parse();

  return one();
}

sub parse {
  foreach my $sLine (@aLines) {

    my ($sPerson1, $sDirection, $sValue, $sPerson2) = $sLine =~ /^(\w+) would (\w+) (\d+) .* (\w+)\.$/;
    $sValue *= -1 if ($sDirection eq 'lose');

    $hHappinessMap{$sPerson1}{$sPerson2} = $sValue;
  }

  @aGuests = keys %hHappinessMap;
}

print "Solution one is: " . one() . "\n";
print "Solution two is: " . two() . "\n";
